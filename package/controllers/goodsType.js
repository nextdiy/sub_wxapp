const GoodsTypeModel = require('../modules/goodsType.js');

class GoodsTypeController {
    static async addGoodsType(ctx) {
        let req = ctx.request.body;
        console.dir(GoodsTypeModel.addGoodsType);
        try {
            let params = {
                name: new Date().getTime()
            }
            //添加商品类型
            let ret = await GoodsTypeModel.addGoodsType(params);
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
                msg: '添加商品类型失败',
                data: error
            }
        }
    }
    static async updateGoodsType(ctx) {
        let req = ctx.request.body;
        try {
            let params = {
                id: 5,
                name: '迅雷超级会员'
            }
            let ret = await GoodsTypeModel.updateGoodsType(params);
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
                msg: '添加商品类型失败',
                data: error
            }
        }
    }
}

module.exports = GoodsTypeController;