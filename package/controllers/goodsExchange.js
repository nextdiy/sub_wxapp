const GoodsExchangeModal = require('../modules/goodsExchange.js');

class GoodsExchangeController {
    static async addGoodsExchange(ctx) {
        let req = ctx.request.body;
        try {
            let params = {
                goodsId: 1,
                userId: 1,
                exchangePrice: 1000,
            }
            let ret = await GoodsExchangeModal.addGoodsExchange(params);
            ctx.response.status = 200;
            ctx.response.body = {
                code: 200,
                msg: 'ok',
                data: ret
            }
        } catch (error) {
            console.log(error);
            ctx.response.status = 412;
            ctx.response.body = {
                code: 412,
                msg: '兑换失败',
                data: error
            }
        }
    }
}

module.exports = GoodsExchangeController;