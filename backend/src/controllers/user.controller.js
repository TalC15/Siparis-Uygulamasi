const User = require('../models/user.model');

exports.getAll = async (req, res) => {
    res.json(await User.getAll());
};

exports.create = async (req, res) => {
    await User.create(req.body.name);
    res.send("Created");
};

exports.update = async (req, res) => {
    await User.update(req.params.id, req.body.name);
    res.send("Updated");
};

exports.delete = async (req, res) => {
    await User.delete(req.params.id);
    res.send("Deleted");
};