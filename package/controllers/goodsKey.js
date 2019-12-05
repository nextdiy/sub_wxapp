const GoodsKeyModel = require('../modules/goodsKey.js');

class GoodsKeyController {
    /**
     * 添加卡密
     * @param {*} ctx 
     */
    static async addGoodsKey(ctx) {
        let req = ctx.request.body;
        try {
            let params = {
                goodsId: 1,
                goodsKey: new Date().getTime() + '----password',
            }
            let ret = await GoodsKeyModel.addGoodsKey(params);
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
                msg: '添加卡密失败',
                data: error
            }
        }
    }
    /**
     * 设置卡密状态为售出
     * @param {*} ctx 
     */
    static async updateGoodsKeySaled(ctx) {
        try {
            let { id } = ctx.params;
           // let params = {};
            let ret = await GoodsKeyModel.updateGoodsKeySaled(id);
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
                msg: '设置售出卡密失败',
                data: error
            }
        }
    }
}

module.exports = GoodsKeyController;