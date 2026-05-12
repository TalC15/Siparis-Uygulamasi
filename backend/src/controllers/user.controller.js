const User = require('../models/user.model');

exports.getAll = async (req, res) => {
    res.json(await User.getAll());
};

exports.create = async (req, res) => {
    const returnedValue = await User.create(req.body);
    if(returnedValue){
        res.status(200).json({message:"Created", status: true});
    }  
    else{
        res.status(200).json({ message: 'Kullanıcı adı zaten var',status: false })
    }
};

exports.update = async (req, res) => {
    const returnedValue = await User.update(req.params.id, req.body);
    if(returnedValue){
        res.status(200).json({message:"Updated"});
    }  
    else{
        res.status(400).json({ message: 'Kullanıcı adı zaten var' })
    }
};

exports.updatePassword = async (req, res) => {
    console.log('updatepassword a geldin')
    const returnedValue = await User.updatePassword(req.params.id, req.body);
    if(returnedValue){
        res.status(200).json({message:"Password is updated"});
    }  
};

exports.delete = async (req, res) => {
    await User.delete(req.params.id);
    res.json({message:"Deleted"});
};