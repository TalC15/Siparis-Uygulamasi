const Order = require('../models/order.modal');
 
exports.getAll = async (req, res) => {
    const result = await Order.getAll();
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({ message: result.message, status: false });
    }
};
 
exports.getDetail = async (req, res) => {
    const result = await Order.getDetail(req.params.id);
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({ message: result.message, status: false });
    }
};
 
exports.createOrder = async (req, res) => {
    const result = await Order.create(req.body);
    if (result.success) {
        res.status(200).json({ message: result.message, status: true, data: result.data });
    } else {
        res.status(200).json({ message: result.message, status: false });
    }
};
 
exports.updateOrder = async (req, res) => {
    const result = await Order.update(req.params.id, req.body);
    if (result.success) {
        res.status(200).json({ message: result.message, status: true });
    } else {
        res.status(200).json({ message: result.message, status: false });
    }
};
 
exports.updateStatus = async (req, res) => {
    const result = await Order.updateStatus(req.params.id, req.body.status);
    if (result.success) {
        res.status(200).json({ message: result.message, status: true });
    } else {
        res.status(200).json({ message: result.message, status: false });
    }
};
 
exports.deleteOrder = async (req, res) => {
    const result = await Order.delete(req.params.id);
    if (result.success) {
        res.status(200).json({ message: result.message, status: true });
    } else {
        res.status(500).json({ message: result.message, status: false });
    }
};

exports.getOrderCount = async (req,res) => {
    const result = await Order.getOrderCount();
    if (result.success) {
        res.status(200).json(result.data);
    } else {
        res.status(500).json({ message: result?.message, status: false });
    }
}