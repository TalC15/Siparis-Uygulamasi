const { pool } = require('../config/db');
const bcrypt = require('bcryptjs');

exports.getAll = async () => {
    const p = await pool;
    const result = await p.request().query('SELECT id, name, username, role FROM Users');
    return result.recordset;
};

exports.create = async (body) => {
    try {
        const p = await pool;
        const { name, username, password, role } = body;

        const check = await p.request()
            .input('username', username ?? null)
            .query('SELECT id FROM Users WHERE username = @username');

        if (check.recordset.length > 0) {
            return { success: false, message: 'Username already exists' };
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await p.request()
            .input('name', name ?? null)
            .input('username', username ?? null)
            .input('password', hashedPassword)
            .input('role', role ?? null)
            .query(`
                INSERT INTO Users (name, username, password, role)
                VALUES (@name, @username, @password, @role)
            `);

        return { success: true, message: 'User created' };

    } catch (err) {
        console.error(err);
        return { success: false, message: 'A problem occurred' };
    }
};

exports.update = async (id, body) => {
    try {
        const p = await pool;
        const { name, username, role } = body;

        const check = await p.request()
            .input('username', username ?? null)
            .query('SELECT id FROM Users WHERE username = @username');

        if (check.recordset.length > 0 && check.recordset[0].id != id) {
            return { success: false, message: 'Username already exists' };
        }

        const result = await p.request()
            .input('id', id)
            .input('name', name ?? null)
            .input('username', username ?? null)
            .input('role', role ?? null)
            .query(`
                UPDATE Users
                SET
                    name     = @name,
                    username = @username,
                    role     = @role
                WHERE id = @id
                 AND (
                    ISNULL(name, '')<> ISNULL(@name, '')
                    OR ISNULL(username, '') <> ISNULL(@username, '')
                    OR ISNULL(role, '') <> ISNULL(@role, '')
                )
            `);

        if (result.rowsAffected[0] === 0) {
            return { success: true, message: 'Nothing changed' };
        }

        return { success: true, message: 'User updated' };

    } catch (err) {
        console.error(err);
        return { success: false, message: 'A problem occurred' };
    }
};

exports.updatePassword = async (id, body) => {
    try {
        const p = await pool;
        const { newPassword } = body;

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await p.request()
            .input('id', id)
            .input('password', hashedPassword)
            .query('UPDATE Users SET password = @password WHERE id = @id');

        return { success: true, message: 'Password updated' };

    } catch (err) {
        console.error(err);
        return { success: false, message: 'A problem occurred' };
    }
};

exports.delete = async (id) => {
    try {
        const p = await pool;
        const result = await p.request()
            .input('id', id)
            .query('DELETE FROM Users WHERE id = @id');

        if (result.rowsAffected[0] === 0) {
            return { success: true, message: 'Nothing deleted' };
        }

        return { success: true, message: 'User deleted' };

    } catch (err) {
        console.error(err);
        return { success: false, message: 'A problem occurred' };
    }
};