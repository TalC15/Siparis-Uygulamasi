const { pool, sql } = require('../config/db');
 
// ---------------------------------------------------------------
// GET ALL
// ---------------------------------------------------------------
exports.getAll = async () => {
    try {
        const p = await pool;
        const result = await p.request().query(`
            SELECT 
                o.id,
                o.customer_id,
                o.user_id,
                o.order_date AS orderDate,
                o.status,
                c.name AS customerName,
                u.name AS userName
            FROM Orders o
            INNER JOIN Customers c ON o.customer_id = c.id
            INNER JOIN Users     u ON o.user_id     = u.id
            ORDER BY o.id DESC
        `);
        return { success: true, data: result.recordset };
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Siparişler alınamadı' };
    }
};
 
// ---------------------------------------------------------------
// GET DETAIL (order items)
// ---------------------------------------------------------------
exports.getDetail = async (id) => {
    try {
        const p = await pool;
        const result = await p.request()
            .input('id', sql.Int, id)
            .query(`
                SELECT 
                    oi.id,
                    oi.order_id,
                    oi.product_id,
                    oi.quantity,
                    p.name AS productName
                FROM OrderItems oi
                INNER JOIN Products p ON oi.product_id = p.id
                WHERE oi.order_id = @id
            `);
        return { success: true, data: result.recordset };
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Sipariş detayı alınamadı' };
    }
};
 
// ---------------------------------------------------------------
// CREATE
// ---------------------------------------------------------------
exports.create = async (body) => {
    const p = await pool;
    const transaction = new sql.Transaction(p);
    try {
        const { customer_id, user_id, items } = body;
 
        if (!customer_id || !user_id) {
            return { success: false, message: 'Müşteri ve kullanıcı zorunludur' };
        }
        if (!Array.isArray(items) || items.length === 0) {
            return { success: false, message: 'En az bir ürün eklenmelidir' };
        }
        for (const item of items) {
            if (!item.product_id || !item.quantity || Number(item.quantity) < 1) {
                return { success: false, message: 'Geçersiz ürün veya miktar' };
            }
        }
 
        await transaction.begin();
 
        const orderResult = await new sql.Request(transaction)
            .input('customer_id', sql.Int, customer_id)
            .input('user_id',     sql.Int, user_id)
            .query(`
                INSERT INTO Orders (customer_id, user_id)
                OUTPUT INSERTED.id
                VALUES (@customer_id, @user_id)
            `);
 
        const order_id = orderResult.recordset[0].id;
 
        for (const item of items) {
            await new sql.Request(transaction)
                .input('order_id',   sql.Int, order_id)
                .input('product_id', sql.Int, item.product_id)
                .input('quantity',   sql.Int, Number(item.quantity))
                .query(`
                    INSERT INTO OrderItems (order_id, product_id, quantity)
                    VALUES (@order_id, @product_id, @quantity)
                `);
        }
 
        await transaction.commit();
        return { success: true, message: 'Sipariş oluşturuldu', data: { id: order_id } };
 
    } catch (err) {
        await transaction.rollback();
        console.error(err);
        return { success: false, message: 'Sipariş oluşturulamadı' };
    }
};
 
// ---------------------------------------------------------------
// UPDATE
// ---------------------------------------------------------------
exports.update = async (id, body) => {
    const p = await pool;
    const transaction = new sql.Transaction(p);
    try {
        const { customer_id, user_id, items } = body;
 
        if (!customer_id) {
            return { success: false, message: 'Müşteri zorunludur' };
        }
        if (!Array.isArray(items) || items.length === 0) {
            return { success: false, message: 'En az bir ürün eklenmelidir' };
        }
        for (const item of items) {
            if (!item.product_id || !item.quantity || Number(item.quantity) < 1) {
                return { success: false, message: 'Geçersiz ürün veya miktar' };
            }
        }
 
        await transaction.begin();
 
        // 1. Orders tablosunu güncelle
        const orderUpdate = await new sql.Request(transaction)
            .input('order_id',    sql.Int, id)
            .input('customer_id', sql.Int, customer_id)
            .input('user_id',     sql.Int, user_id ?? null)
            .query(`
                UPDATE Orders
                SET customer_id = @customer_id,
                    user_id     = @user_id
                WHERE id = @order_id
            `);
 
        if (orderUpdate.rowsAffected[0] === 0) {
            await transaction.rollback();
            return { success: false, message: 'Sipariş bulunamadı' };
        }
 
        // 2. Eski items sil
        await new sql.Request(transaction)
            .input('order_id', sql.Int, id)
            .query('DELETE FROM OrderItems WHERE order_id = @order_id');
 
        // 3. Yeni items ekle
        for (const item of items) {
            await new sql.Request(transaction)
                .input('order_id',   sql.Int, id)
                .input('product_id', sql.Int, item.product_id)
                .input('quantity',   sql.Int, Number(item.quantity))
                .query(`
                    INSERT INTO OrderItems (order_id, product_id, quantity)
                    VALUES (@order_id, @product_id, @quantity)
                `);
        }
 
        await transaction.commit();
        return { success: true, message: 'Sipariş güncellendi' };
 
    } catch (err) {
        await transaction.rollback();
        console.error(err);
        return { success: false, message: 'Sipariş güncellenemedi' };
    }
};
 
// ---------------------------------------------------------------
// UPDATE STATUS
// ---------------------------------------------------------------
exports.updateStatus = async (id, status) => {
    try {
        const VALID_STATUSES = ['pending', 'delivered'];
        if (!VALID_STATUSES.includes(status)) {
            return { success: false, message: 'Geçersiz durum değeri' };
        }
 
        const p = await pool;
        const result = await p.request()
            .input('id',     sql.Int,     id)
            .input('status', sql.VarChar, status)
            .query(`
                UPDATE Orders
                SET status = @status
                WHERE id = @id
            `);
 
        if (result.rowsAffected[0] === 0) {
            return { success: false, message: 'Sipariş bulunamadı' };
        }
        return { success: true, message: 'Durum güncellendi' };
    } catch (err) {
        console.error(err);
        return { success: false, message: 'Durum güncellenemedi' };
    }
};
 
// ---------------------------------------------------------------
// DELETE
// ---------------------------------------------------------------
exports.delete = async (id) => {
    const p = await pool;
    const transaction = new sql.Transaction(p);
    try {
        await transaction.begin();
 
        await new sql.Request(transaction)
            .input('id', sql.Int, id)
            .query('DELETE FROM OrderItems WHERE order_id = @id');
 
        const result = await new sql.Request(transaction)
            .input('id', sql.Int, id)
            .query('DELETE FROM Orders WHERE id = @id');
 
        await transaction.commit();
 
        if (result.rowsAffected[0] === 0) {
            return { success: true, message: 'Silinecek sipariş bulunamadı' };
        }
        return { success: true, message: 'Sipariş silindi' };
 
    } catch (err) {
        await transaction.rollback();
        console.error(err);
        return { success: false, message: 'Sipariş silinemedi' };
    }
};