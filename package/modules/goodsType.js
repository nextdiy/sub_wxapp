//引入sequelize对象
const { sequelize } = require('../../config/db.js');
//引入goodsType数据表模型
const GoodsType = sequelize.import('../schema/goodsType.js');
//自动创建表
GoodsType.sync({ force: false });

class GoodsTypeModel {
    /**
     * 添加商品类型
     * @param {*} data 
     */
    static async addGoodsType(data = {}) {
        return await GoodsType.create({
            name: data.name
        })
    }
    static async updateGoodsType(data = {}) {
        let ret = await GoodsType.findOne({
            where: {
                id: data.id
            }
        })
        ret.name = data.name;
        ret.updateAt = new Date();
        return await ret.save();
    }
}

module.exports = GoodsTypeModel;