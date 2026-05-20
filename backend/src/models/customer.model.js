const { pool } = require('../config/db');

exports.getAll = async () => {
    const p = await pool;
    const result = await p.request().query('SELECT * FROM Customers');
    return result.recordset;
};

exports.create = async (body) => {
    try {
        const p = await pool;
        const { name, address, phone, branch } = body;

        await p.request()
            .input('name', name ?? null)
            .input('address', address ?? null)
            .input('phone', phone ?? null)
            .input('branch', branch ?? null)
            .query(`
                INSERT INTO Customers (name, address, phone, branch)
                VALUES (@name, @address, @phone, @branch)
            `);

        return { success: true, message: 'Customer created' };

    } catch (err) {
        console.error(err);
        return { success: false, message: 'A problem occurred' };
    }
};

exports.update = async (id, body) => {
    try {
        const p = await pool;
        const { name, address, phone, branch } = body;

        const result = await p.request()
            .input('id', id)
            .input('name', name ?? null)
            .input('address', address ?? null)
            .input('phone', phone ?? null)
            .input('branch', branch ?? null)
            .query(`
                UPDATE Customers
                SET
                    name    = @name,
                    address = @address,
                    phone   = @phone,
                    branch  = @branch
                WHERE id = @id
                AND (
                    ISNULL(name, '')    <> ISNULL(@name, '')
                    OR ISNULL(address, '') <> ISNULL(@address, '')
                    OR ISNULL(phone, '')   <> ISNULL(@phone, '')
                    OR ISNULL(branch, '')  <> ISNULL(@branch, '')
                )
            `);

        if (result.rowsAffected[0] === 0) {
            return { success: true, message: 'Nothing changed' };
        }

        return { success: true, message: 'Customer updated' };

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
            .query('DELETE FROM Customers WHERE id = @id');

        if (result.rowsAffected[0] === 0) {
            return { success: true, message: 'Nothing deleted' };
        }

        return { success: true, message: 'Customer deleted' };

    } catch (err) {
        console.error(err);
        return { success: false, message: 'A problem occurred' };
    }
};

exports.getCustomerOrderCount = async () => {
    try{
        const p = await pool
        const result = await p.request().query('select * from CustomerOrderCountsView')
        return {success:true,data:result.recordset}
    }catch (err) {
        console.error(err);
        return { success: false, message: 'A problem occurred' };
    }
}