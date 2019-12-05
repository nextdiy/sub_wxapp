const { sequelize } = require('../../config/db.js');
const GoodsKey = sequelize.import('../schema/goodsKey.js');
GoodsKey.sync({ force: false });

class GoodsKeyModal {
    /**
     * 添加卡密
     * @param {*} data 
     */
    static async addGoodsKey(data) {
        return GoodsKey.create({
            goodsId: data.goodsId,
            goodsKey: data.goodsKey,
        })
    }
    /**
     * 设置卡密状态为售出
     */
    static async updateGoodsKeySaled(id) {
        let ret = await GoodsKey.findOne({
            where: {
                id
            }
        })
        ret.goodsKeyStatus = 1;
        ret.updatedAt = new Date();
        return await ret.save();
    }
}

module.exports = GoodsKeyModal;
