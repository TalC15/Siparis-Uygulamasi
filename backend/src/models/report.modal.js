const { pool } = require('../config/db');

exports.getProductReports = async () => {
    const p = await pool;
    const result = await p.request().query('select * from ProductReports');
    return result.recordset;
};

exports.getOrderDetailReports = async () => {
    const p = await pool;
    const result = await p.request().query('select * from OrderDetailReports');
    return result.recordset;
}