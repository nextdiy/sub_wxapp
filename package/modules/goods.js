//引入sequelize对象
const { sequelize } = require('../../config/db.js');
//引入goods数据表模型
const Goods = sequelize.import('../schema/goods.js');
//自动创建表
Goods.sync({ force: false });

class GoodsModel{
    /**
     * 添加商品
     * @param {*} data 
     */
    static async addGoods(data = {}) {
        return await Goods.create({
            name: data.name,
            icon: data.icon,
            price: data.price,
            account: data.account,
            password: data.password,
            remark: data.remark,
            limit: data.limit,
            maxShared: data.maxShared
        })
    }
    /**
     * 更新商品信息
     * @param {*} id 
     * @param {*} data 
     */
    static async updateGoods(id, data) {
        let ret = await Goods.findOne({
            where: {
                id
            }
        })
        ret.name = data.name ? data.name : ret.name;
        ret.icon = data.icon ? data.icon : ret.icon;
        ret.price = data.price ? data.price : ret.price;
        ret.account = data.account ? data.account : ret.account;
        ret.password = data.password ? data.password : ret.password;
        ret.remark = data.remark ? data.remark : ret.remark;
        ret.limit = data.limit ? data.limit : ret.limit;
        ret.shared = data.shared ? data.shared : ret.shared;
        ret.maxShared = data.maxShared ? data.maxShared : ret.maxShared;
        ret.updatedAt = new Date();
        return await ret.save();
    }
}

module.exports = GoodsModel;
