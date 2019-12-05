const AppUserModal = require('../modules/appUser.js');

class AppUserController {
    /**
     * 添加用户
     * @param {*} ctx 
     */
    static async addAppUser(ctx) {
        let req = ctx.request.body;
        try {
            let params = {
                openid: 'openid-usernamdkdsfkjkf',
                nickName: 'Next',
                signTime: '2019-12-03',
                integral: 1000,
            };
            let ret = await AppUserModal.addAppUser(params);
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
                msg: '添加失败',
                data: error
            }
        }
    }
    /**
     * 更新用户
     * @param {*} ctx 
     */
    static async updateAppUser(ctx) {
        try {
            let params = ctx;
            let ret = await AppUserModal.updateAppUser(openid, params);
            return {
                status: 200,
                msg: 'ok',
                data: ret
            }
        } catch (error) {
            return {
                status: 412,
                msg: '更新用户信息失败',
                data: error
            }
        }
    }
    /**
     * 查询用户
     * @param {*} openid 
     */
    static async findAppUser(openid) {
        try {
            let ret = await AppUserModal.findAppUser(openid);
            return {
                status: 200,
                msg: 'ok',
                data: ret
            }
        } catch (error) {
            return {
                status: 412,
                msg: '查询用户失败',
                data: error
            }
        }
    }
    /**
     * 用户签到
     * @param {*} openid 
     */
    static async appUserSignIn(openid, nickName = '未知') {
        try {
            let findRet = await AppUserModal.findAppUser(openid);
            let newSignTime = new Date();
            let newIntegral = Math.floor(Math.random() * 100);
            //判断新用户
            if(!findRet) {
                newIntegral = newIntegral + 1000;
                //添加新用户
                let addRet = await AppUserModal.addAppUser({
                    openid,
                    nickName,
                    signTime: newSignTime,
                    integral: newIntegral
                })
                return {
                    status: 200,
                    msg: '签到成功！',
                    data: {
                        newIntegral,
                        user: addRet.dataValues,
                        isNew: true
                    }
                };
            }
            console.log("findRet", findRet.dataValues)
            let { integral, signTime } = findRet.dataValues;
            console.log(integral, signTime);
            // //判断该用户今天是否签到过
            if(new Date().toDateString() === new Date(signTime).toDateString()) {
                return {
                    status: 200,
                    msg: '你今天已经签到过了！',
                    data: {
                        newIntegral: 0,
                        user: findRet.dataValues,
                        isNew: false
                    }
                };
            }
            //否则更新用户信息
            let params = {
                integral: Number(integral) + newIntegral,
                signTime: newSignTime,
                nickName
            }
            let oldRet = await AppUserModal.updateAppUser(openid, params);
            return {
                status: 200,
                msg: '签到成功！',
                data: {
                    newIntegral,
                    user: oldRet.dataValues,
                    isNew: false
                }
            };
        } catch (error) {
            return {
                status: 412,
                msg: '签到失败，请重试',
                data: error
            };
        }
    }
}

module.exports = AppUserController;