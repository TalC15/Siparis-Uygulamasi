const { pool } = require('../config/db');

exports.getAll = async () => {
    const p = await pool;
    return (await p.request().query('SELECT id,name,username,role FROM Users')).recordset;
};

exports.create = async (name) => {
    const p = await pool;
    await p.request().input('name', name)
        .query('INSERT INTO Users (name) VALUES (@name)');
};

exports.update = async (id, name) => {
    const p = await pool;
    await p.request()
        .input('id', id)
        .input('name', name)
        .query('UPDATE Users SET name=@name WHERE id=@id');
};

exports.delete = async (id) => {
    const p = await pool;
    await p.request()
        .input('id', id)
        .query('DELETE FROM Users WHERE id=@id');
};