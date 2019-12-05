const AppTokenModal = require('../modules/appToken.js');

class AppTokenController {
    /**
     * 重置刷新token
     */
    static async resetAppToken() {
        console.log("重置token")
        try {
            let params = {
                tokenValue: new Date().getTime() + '7ffdcca28f8394c3112a',
                tokenExpired: new Date(new Date().getTime() + (7200 * 1000)),
            }
            let tokenRet = await AppTokenModal.getAppToken();
            let ret = tokenRet ? await AppTokenModal.updateAppToken(params) : await AppTokenModal.addAppToken(params);
            return ret.dataValues.tokenValue;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    /**
     * 获取token
     * @param {*}} ctx 
     */
    static async getAppToken(ctx) {
        try {
            let tokenRet = await AppTokenModal.getAppToken();
            let token = null;
            if(!tokenRet) {
                //重置token
                token = await AppTokenController.resetAppToken();
            } else {
                let { tokenValue, tokenExpired } = tokenRet.dataValues;
                console.log(tokenValue, tokenExpired);
                if(new Date().getTime() > new Date(tokenExpired).getTime()) {
                    console.log("token已失效~~");
                    //重置token
                    tokenValue = await AppTokenController.resetAppToken();
                }
                token = tokenValue;
            }
            ctx.response.status = 200;
            ctx.response.body = {
                code: 200,
                msg: 'ok',
                data: token
            }
        } catch (error) {
            console.log(error);
            ctx.response.status = 412;
            ctx.response.body = {
                code: 412,
                msg: '获取token失败',
                data: error
            }
        }
    }
}

module.exports = AppTokenController;