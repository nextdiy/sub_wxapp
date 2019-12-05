const { sequelize } = require('../../config/db.js');
const AppToken = sequelize.import('../schema/appToken.js');
AppToken.sync({ force: false })
class AppTokenModal {
    /**
     * 添加access_token
     * @param {*} data 
     */
    static async addAppToken(data = {}) {
        return await AppToken.create({
            tokenName: 'access_token',
            tokenValue: data.tokenValue,
            tokenExpired: data.tokenExpired,
        })
    }
    /**
     * 更新access_token
     * @param {*} data 
     */
    static async updateAppToken(data = {}) {
        let ret = await AppToken.findOne({
            where: {
                tokenName: 'access_token'
            }
        })
        ret.tokenValue = data.tokenValue;
        ret.tokenExpired = data.tokenExpired;
        return await ret.save();
    }
    /**
     * 获取access_token
     */
    static async getAppToken() {
        let ret = await AppToken.findOne({
            where: {
                tokenName: 'access_token'
            }
        })
        return ret;
    }
}

module.exports = AppTokenModal;
