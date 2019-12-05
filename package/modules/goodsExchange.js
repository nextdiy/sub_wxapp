const { sequelize } = require('../../config/db.js');
const GoodsExchange = sequelize.import('../schema/goodsExchange.js');
GoodsExchange.sync({ force: false });

class GoodsExchangeModal {
    static async addGoodsExchange(data) {
        return await GoodsExchange.create({
            goodsId: data.goodsId,
            userId: data.userId,
            exchangePrice: data.exchangePrice,
        })
    }
}

module.exports = GoodsExchangeModal;