const Report = require('../models/report.modal');

exports.getProductReports = async (req, res) => {
    res.json(await Report.getProductReports());
};

exports.getOrderDetailReports = async (req,res) => {
    res.json(await Report.getOrderDetailReports());
}
