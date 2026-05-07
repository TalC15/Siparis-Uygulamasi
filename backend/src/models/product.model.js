const { pool } = require('../config/db');

exports.getAll = async () => {
    const p = await pool;
    const result = await p.request().query('SELECT * FROM Products');
    return result.recordset;
};

exports.create = async (body) => {

    try {
        const p = await pool;

        const {
            name,
            unit_type,
            unit_weight,
            box_quantity,
            box_weight
        } = body;

        const unit_weight_ = Number(unit_weight)
        const box_quantity_ = Number(box_quantity)
        const box_weight_ = Number(box_weight)
      
        const result = await p.request()
            .input("name", name)
            .input("unit_type", unit_type)
            .input("unit_weight", unit_weight_)
            .input("box_quantity", box_quantity_)
            .input("box_weight", box_weight_)
            .query(`
                INSERT INTO Products
                (name, unit_type, unit_weight, box_quantity, box_weight)
                OUTPUT INSERTED.*
                VALUES
                (@name, @unit_type, @unit_weight, @box_quantity, @box_weight)
            `);

        return result.recordset[0];

    } catch (err) {
        console.error(err);
        return {
            success: false,
            message: "Bir sorun oluştu"
        };
    }
};

exports.update = async (body, id) => {
    try {
        const p = await pool;

        const {
            name,
            unit_type,
            unit_weight,
            box_quantity,
            box_weight
        } = body;

        const result = await p.request()
            .input("name", name)
            .input("unit_type", unit_type)
            .input("unit_weight", unit_weight)
            .input("box_quantity", box_quantity)
            .input("box_weight", box_weight)
            .input("id", id)
            .query(`
                UPDATE Products
                SET
                    name = @name,
                    unit_type = @unit_type,
                    unit_weight = @unit_weight,
                    box_quantity = @box_quantity,
                    box_weight = @box_weight
                WHERE id = @id
            `);

        if (result.rowsAffected[0] === 0) {
            return {
                success: false,
                message: "Ürün bulunamadı"
            };
        }
        
        return {
            success: true,
            message: "Güncelleme başarılı"
        };

    } catch (err) {
        console.error(err);

        return {
            success: false,
            message: "Bir hata oluştu"
        };
    }
};

exports.delete = async (id) => {
    try{
    const p = await pool
    const result = await p.request()
    .input('id',id)
    .query('delete from products where id = @id');
    if(result.rowsAffected[0] === 0)
        return{
            success : false,
            message : 'failed'
        }
    return {
        success : true,
        message : 'silme başarılı'
    }
    }catch(err){
        console.log(err)
        return {
                success: false,
                message: "bir problem yaşandı"
            };
    }

}
