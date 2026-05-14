const Product = require('../models/product.model');

exports.getProducts = async (req, res) => {
    res.json(await Product.getAll());
};

exports.postProduct = async (req,res) =>{
    const returnedValue = await Product.create(req.body)
    if(returnedValue.success){
        res.status(200).json({message:returnedValue.message, status: true});
    }  
    else{
        res.status(200).json({ message:returnedValue.message, status: false })
    }
}

exports.updateProduct = async (req,res) => {
    const returnedValue = await Product.update(req.body,req.params.id)
    if(returnedValue.success){
        res.status(200).json({message:returnedValue.message, status: true});
    }  
    else{
        res.status(200).json({ message:returnedValue.message, status: false })
    }
}

exports.deleteProduct = async (req,res) =>{
    const returnedValue = await Product.delete(req.params.id)
    if(returnedValue.success){
        res.status(200).json({message:returnedValue.message, status: true});
    }  
    else{
        res.status(200).json({ message:returnedValue.message, status: false })
    }
}