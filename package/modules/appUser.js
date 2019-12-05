//引入sequelize对象
const { sequelize } = require('../../config/db.js');
//引入goods数据表模型
const AppUser = sequelize.import('../schema/appUser.js');
//自动创建表
AppUser.sync({ force: false });

class AppUserModal {
    /**
     * 添加新用户
     * @param {openid, nickName, signTime, integral}} data 
     */
    static async addAppUser(data = {}) {
        return await AppUser.create({
            openid: data.openid,
            nickName: data.nickName,
            signTime: data.signTime,
            integral: data.integral,
        })
    }
    /**
     * 更新用户信息
     * @param {openid, data: {nickName, signTime, integral}}  
     */
    static async updateAppUser(openid, data = {}) {
        let ret = await AppUserModal.findAppUser(openid);
        ret.nickName = data.nickName;
        ret.signTime = data.signTime;
        ret.integral = data.integral;
        return await ret.save();
    }
    /**
     * 获取用户信息
     * @param {*} openid 
     */
    static async findAppUser(openid) {
        return await AppUser.findOne({
            where: {
                openid
            }
        })
    }
}

module.exports = AppUserModal;

