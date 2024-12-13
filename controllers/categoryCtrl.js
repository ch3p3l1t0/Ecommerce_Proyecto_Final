const Category = require('../models/categoryModel')
const Products = require('../models/productModel')

const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    createCategory: async (req, res) =>{
        try {
            // Si el usuario tiene rol = 1 ---> admin
            // Solo el administrador puede crear, eliminar y actualizar categorías
            const {name} = req.body;
            const category = await Category.findOne({name})
            if(category) return res.status(400).json({msg: "Esta categoría ya existe."})

            const newCategory = new Category({name})

            await newCategory.save()
            res.json({msg: "Creó una categoría"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req, res) =>{
        try {
            const products = await Products.findOne({category: req.params.id})
            if(products) return res.status(400).json({
                msg: "Elimine todos los productos con una relación."
            })

            await Category.findByIdAndDelete(req.params.id)
            res.json({msg: "Se eliminó una categoría"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateCategory: async(req, res) =>{
        try {
            const {name} = req.body;
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Actualizada una categoría"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}


module.exports = categoryCtrl