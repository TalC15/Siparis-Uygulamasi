const { pool } = require('../config/db');
const bcrypt = require('bcryptjs')

exports.getAll = async () => {
    const p = await pool;
    return (await p.request().query('SELECT id,name,username,role FROM Users')).recordset;
};

exports.create = async (body,res) => {
    const p = await pool;
    const {name,username,password,role} = body
     // username kontrol
        const check = await p.request()
            .input('username', username)
            .query('SELECT * FROM Users WHERE username=@username');

        if (check.recordset.length > 0) {
            return 
        }
        // şifre hash
    const hashedPassword = await bcrypt.hash(password, 10);
    await p.request()
    .input('name', name)
    .input('username',username)
    .input('hashedPassword',hashedPassword)
    .input('role',role)
    .query('INSERT INTO Users(name,username,password,role) VALUES(@name,@username,@hashedPassword,@role)');
};

exports.update = async (id, body) => {
    const p = await pool;
    const {name,username,password,role} = body
    // username kontrol
        const check = await p.request()
            .input('username', username)
            .query('SELECT * FROM Users WHERE username=@username');

        if (check.recordset.length > 0) {
            return res.status(400).json({ message: 'Kullanıcı adı zaten var' });
        }

        // şifre hash
        const hashedPassword = await bcrypt.hash(password, 10);

    await p.request()
        .input('id', id)
        .input('name', name)
        .input('username',username)
        .input('hadhedPassword',hashedPassword)
        .input('role',role)
        .query('UPDATE Users SET name=@name,username=@username,password=@hashedPassword,role=@role WHERE id=@id');
        res.json({ message: 'Kullanıcı güncellendi' });
};

exports.delete = async (id) => {
    const p = await pool;
    await p.request()
        .input('id', id)
        .query('DELETE FROM Users WHERE id=@id');
};