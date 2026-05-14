const { pool } = require('../config/db');

function normalizeNumber(value) {
    if (value === null || value === undefined || value === '') return null;
    const num = Number(String(value).replace(',', '.'));
    return isNaN(num) ? null : num;
}

exports.getAll = async () => {
    const p = await pool;
    const result = await p.request().query('SELECT * FROM Products');
    return result.recordset;
};

exports.create = async (body) => {
    try {
        const p = await pool;
        const { name, unit_type, unit_weight, box_quantity, box_weight } = body;

        if(unit_weight<0 || box_quantity<0 || box_weight<0 ){
            return { success: false, message: 'Negative values not allowed' };
        }

        await p.request()
            .input('name', name ?? null)
            .input('unit_type', unit_type ?? null)
            .input('unit_weight', normalizeNumber(unit_weight))
            .input('box_quantity', normalizeNumber(box_quantity))
            .input('box_weight', normalizeNumber(box_weight))
            .query(`
                INSERT INTO Products (name, unit_type, unit_weight, box_quantity, box_weight)
                VALUES (@name, @unit_type, @unit_weight, @box_quantity, @box_weight)
            `);

        return { success: true, message: 'Product created' };

    } catch (err) {
        console.error(err);
        return { success: false, message: 'A problem occurred' };
    }
};

exports.update = async (body, id) => {
    try {
        const p = await pool;
        const { name, unit_type, unit_weight, box_quantity, box_weight } = body;

        if(unit_weight<0 || box_quantity<0 || box_weight<0 ){
            return { success: false, message: 'Negative values not allowed' };
        }

        const result = await p.request()
            .input('name', name ?? null)
            .input('unit_type', unit_type ?? null)
            .input('unit_weight', normalizeNumber(unit_weight))
            .input('box_quantity', normalizeNumber(box_quantity))
            .input('box_weight', normalizeNumber(box_weight))
            .input('id', id)
            .query(`
                UPDATE Products
                SET
                    name        = @name,
                    unit_type   = @unit_type,
                    unit_weight = @unit_weight,
                    box_quantity = @box_quantity,
                    box_weight  = @box_weight
                WHERE id = @id
                AND (
                    ISNULL(name, '')       <> ISNULL(@name, '')
                    OR ISNULL(unit_type, '') <> ISNULL(@unit_type, '')
                    OR (unit_weight  <> @unit_weight  OR (unit_weight  IS NULL AND @unit_weight  IS NOT NULL) OR (unit_weight  IS NOT NULL AND @unit_weight  IS NULL))
                    OR (box_quantity <> @box_quantity OR (box_quantity IS NULL AND @box_quantity IS NOT NULL) OR (box_quantity IS NOT NULL AND @box_quantity IS NULL))
                    OR (box_weight   <> @box_weight   OR (box_weight   IS NULL AND @box_weight   IS NOT NULL) OR (box_weight   IS NOT NULL AND @box_weight   IS NULL))
                )
            `);

        if (result.rowsAffected[0] === 0) {
            return { success: true, message: 'Nothing changed' };
        }

        return { success: true, message: 'Product updated' };

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
            .query('DELETE FROM Products WHERE id = @id');

        if (result.rowsAffected[0] === 0) {
            return { success: true, message: 'Nothing deleted' };
        }

        return { success: true, message: 'Product deleted' };

    } catch (err) {
        console.error(err);
        return { success: false, message: 'A problem occurred' };
    }
};