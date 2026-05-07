const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// ✅ REGISTER
exports.register = async (req, res) => {
    const { name, username, password } = req.body;

    try {
        const p = await pool;

        // username kontrol
        const check = await p.request()
            .input('username', username)
            .query('SELECT * FROM Users WHERE username=@username');

        if (check.recordset.length > 0) {
            return res.status(400).json({ message: 'Kullanıcı adı zaten var' });
        }

        // şifre hash
        const hashedPassword = await bcrypt.hash(password, 10);

        // kayıt
        await p.request()
            .input('name', name)
            .input('username', username)
            .input('password', hashedPassword)
            .query(`
                INSERT INTO Users (name, username, password)
                VALUES (@name, @username, @password)
            `);

        res.json({ message: 'Kullanıcı oluşturuldu' });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// ✅ LOGIN
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const p = await pool;

        const result = await p.request()
            .input('username', username)
            .query('SELECT * FROM Users WHERE username=@username');

        const user = result.recordset[0];

        if (!user) {
            return res.status(401).json({ message: 'Kullanıcı yok' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ message: 'Şifre hatalı' });
        }

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.json({ token });

    } catch (err) {
        res.status(500).send(err.message);
    }
};

// verify/token kontrol
exports.verify =  (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        res.status(200).json({ valid: true })
    } catch (err) {
        res.status(401).json({ valid: false })
    }
}