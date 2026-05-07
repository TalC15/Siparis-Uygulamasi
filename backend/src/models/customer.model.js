const { pool } = require('../config/db');

exports.getAll = async () => {
    const p = await pool;
    return (await p.request().query('SELECT * FROM Customers')).recordset;
};

exports.create = async (body) => {
    const p = await pool;
    const {name,address,phone,branch} = body
    await p.request()
    .input('name', name)
    .input('address', address)
    .input('phone', phone)
    .input('branch', branch)
        .query('INSERT INTO Customers(name,address,phone,branch) VALUES (@name,@address,@phone,@branch)');
};

exports.update = async (id, body) => {
    const p = await pool;
    const {name,address,phone,branch} = body
    await p.request()
        .input('id', id)
        .input('name', name)
        .input('address', address)
        .input('phone', phone)
        .input('branch', branch)
        .query('UPDATE Customers SET name=@name,address=@address,phone=@phone,branch=@branch WHERE id=@id');
};

exports.delete = async (id) => {
    const p = await pool;
    await p.request()
        .input('id', id)
        .query('DELETE FROM Customers WHERE id=@id');
};