const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
    const data = await Product.getAll();
    res.json(data);
};

exports.postProduct = async (req,res) =>{
    const result = await Product.create(req.body)
    res.json(result)
}

exports.updateProduct = async (req,res) => {
    const result = await Product.update(req.body,req.params.id)
    res.json(result)
}

exports.deleteProduct = async (req,res) =>{
    const result = await Product.delete(req.params.id)
    res.json(result)
}