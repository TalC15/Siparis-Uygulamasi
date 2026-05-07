const Customer = require('../models/customer.model');

exports.getAll = async (req, res) => {
    const receivedData= await Customer.getAll();
    res.json(receivedData);
};

exports.create = async (req, res) => {
    await Customer.create(req.body);
    res.json({'Data':'Created'});
};

exports.update = async (req, res) => {
    await Customer.update(req.params.id, req.body);
    res.json("Updated");
};

exports.delete = async (req, res) => {
    await Customer.delete(req.params.id);
    res.json("Deleted");
};