const { pool, sql } = require('../config/db');

exports.getAll = async (req, res) => {
    const p = await pool;

    const result = await p.request().query(`
        SELECT 
            o.id,
            c.name as customer,
            u.name as users,
            o.order_date
        FROM Orders o
        INNER JOIN Customers c ON o.customer_id = c.id
        INNER JOIN Users u ON o.user_id = u.id
        ORDER BY o.id DESC
    `);
    res.json(result.recordset);
};

exports.getDetail = async (req, res) => {
    const p = await pool;

    const result = await p.request()
        .input('id', req.params.id)
        .query(`
            SELECT 
                p.name,
                oi.quantity
            FROM OrderItems oi
            JOIN Products p ON oi.product_id = p.id
            WHERE oi.order_id = @id
        `);

    res.json(result.recordset);
};

exports.createOrder = async (req,res) => {
    const p = await pool;
    const customerId = req.body.customer_id
    const userId = req.body.user_id
    const items = req.body.items
    const orderResult = await p.request()
    .input('customer_id', customerId)
    .input('user_id',userId)
    .query(` INSERT INTO Orders(customer_id,user_id) 
        OUTPUT INSERTED.id VALUES(@customer_id,@user_id)`);

    const order_id = orderResult.recordset[0].id;
    for (let item of items) {
            await p.request()
                .input('order_id', order_id)
                .input('product_id', item.product_id)
                .input('quantity', item.quantity)
                .query(`
                    INSERT INTO orderItems(order_id, product_id, quantity)
                    VALUES (@order_id, @product_id, @quantity)
                `);
       }
   
    res.json({id:order_id})   
};

exports.updateOrder = async (req, res) => {
    const p = await pool;
    const transaction = new sql.Transaction(p);

    try {
        const orderId = req.params.id;
        const customerId = req.body.customer_id;
        const userId = req.body.user_id;
        const items = req.body.items;

        await transaction.begin();

        // 1. Orders tablosunu güncelle
        await new sql.Request(transaction)
            .input('order_id', orderId)
            .input('customer_id', customerId)
            .input('user_id', userId)
            .query(`
                UPDATE Orders
                SET customer_id = @customer_id,
                    user_id = @user_id
                WHERE id = @order_id
            `);

        // 2. Eski orderItems kayıtlarını sil
        await new sql.Request(transaction)
            .input('order_id', orderId)
            .query(`
                DELETE FROM orderItems
                WHERE order_id = @order_id
            `);

        // 3. Yeni itemları ekle
        for (let item of items) {
            await new sql.Request(transaction)
                .input('order_id', orderId)
                .input('product_id', item.product_id)
                .input('quantity', item.quantity)
                .query(`
                    INSERT INTO orderItems(order_id, product_id, quantity)
                    VALUES (@order_id, @product_id, @quantity)
                `);
        }

        // Her şey başarılıysa commit
        await transaction.commit();

        res.send({ message: "Order updated successfully", order_id: orderId });

    } catch (err) {
        // Hata varsa rollback
        await transaction.rollback();
        console.error(err);
        res.status(500).send({ error: "Order update failed" });
    }
};

exports.deleteOrder = async (req, res) => {
    const p = await pool;

    await p.request()
        .input('id', req.params.id)
        .query('DELETE FROM OrderItems WHERE order_id=@id');

    await p.request()
        .input('id', req.params.id)
        .query('DELETE FROM Orders WHERE id=@id');

    res.send("Deleted");
};


