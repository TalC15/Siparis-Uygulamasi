const Customer = require('../models/customer.model');

exports.getAll = async (req, res) => {
    res.json(await Customer.getAll());
};

exports.create = async (req, res) => {
    const returnedValue = await Customer.create(req.body);
     if(returnedValue.success){
        res.status(200).json({message:returnedValue.message, status: true});
    }  
    else{
        res.status(200).json({ message:returnedValue.message, status: false })
    }
};

exports.update = async (req, res) => {
    const returnedValue = await Customer.update(req.params.id, req.body);
     if(returnedValue.success){
        res.status(200).json({message:returnedValue.message, status: true});
    }  
    else{
        res.status(200).json({ message:returnedValue.message, status: false })
    }
};

exports.delete = async (req, res) => {
    const returnedValue = await Customer.delete(req.params.id);
     if(returnedValue.success){
        res.status(200).json({message:returnedValue.message, status: true});
    }  
    else{
        res.status(200).json({ message:returnedValue.message, status: false })
    }
};

exports.getCustomerOrderCount = async (req,res) => {
    const returnedValue = await Customer.getCustomerOrderCount();
    if(returnedValue.success){
        res.status(200).json(returnedValue.data)
    }
    else{
        res.status(500).json({message:returnedValue.message,status:false})
    }
}