const GoodsModel = require('../modules/goods.js');

class GoodsController {
    static async addGoods(ctx) {
        console.log(GoodsModel.addGoods);
        let req = ctx.request.body;
        try {
            let params = {
                name: '迅雷白金会员12小时',
                icon: './img.png',
                price: 1000,
                account: '9123456',
                password: 'qq123456',
                remark: '这是备注',
                limit: 1,
                maxShared: 2
            }
            let ret = await GoodsModel.addGoods(params);
            ctx.response.status = 200;
            ctx.response.body = {
                code: 200,
                msg: 'ok',
                data: ret
            }
        } catch (error) {
            ctx.response.status = 412;
            ctx.response.body = {
                code: 412,
                msg: '添加商品失败',
                data: error
            }
        }
    }
    static async updateGoods(ctx) {
        console.log(ctx.params);
        try {
            let { id } = ctx.params;
            let params = {
                name: '迅雷白金会员24小时',
                account: '98889999',
                password: '1234566',
                shared: 1
            };
            let ret = await GoodsModel.updateGoods(id, params);
            console.log(ret);
            ctx.response.status = 200;
            ctx.response.body = {
                code: 200,
                msg: 'ok',
                data: ret
            }
        } catch (error) {
            ctx.response.status = 412;
            ctx.response.body = {
                code: 412,
                msg: '更新商品失败',
                data: error
            }
        }
    }
}

module.exports = GoodsController;