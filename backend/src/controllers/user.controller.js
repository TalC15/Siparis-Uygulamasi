const User = require('../models/user.model');

exports.getAll = async (req, res) => {
    res.json(await User.getAll());
};

exports.create = async (req, res) => {
    const returnedValue = await User.create(req.body);
    if(returnedValue.success){
        res.status(200).json({message:returnedValue.message, status: true});
    }  
    else{
        res.status(200).json({ message:returnedValue.message,status: false })
    }
};

exports.update = async (req, res) => {
    const returnedValue = await User.update(req.params.id, req.body);
    if(returnedValue.success){
        res.status(200).json({message:returnedValue.message, status: true});
    }  
    else{
        res.status(200).json({ message:returnedValue.message, status: false })
    }
};

exports.updatePassword = async (req, res) => {
    const returnedValue = await User.updatePassword(req.params.id, req.body);
    if(returnedValue.success){
        res.status(200).json({message:returnedValue.message, status: true});
    }  
    else{
        res.status(200).json({ message:returnedValue.message, status: false })
    }
};

exports.delete = async (req, res) => {
    const returnedValue = await User.delete(req.params.id);
      if(returnedValue.success){
        res.status(200).json({message:returnedValue.message, status: true});
    }  
    else{
        res.status(200).json({ message:returnedValue.message, status: false })
    }
};