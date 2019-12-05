const router = require('koa-router')();
const wechat = require('co-wechat');
const wechatConfig = require('../config/wechat.js');
const WechatAPI = require('co-wechat-api');
const wechatApi = new WechatAPI(wechatConfig.appid, wechatConfig.appsecret);
//引入消息模板
const { signInTemp } = require('../utils/wechat_template.js');

//appUserController
const AppUserController = require('../package/controllers/appUser.js');

/**
 * 微信事件处理
 */
router.all('/wechat', wechat(wechatConfig).middleware(
    async (message, ctx) => {
        let replay = '';
        switch(message.MsgType) {
            case 'event':
                replay = '收到事件消息';
                break;
            case 'text': 
                replay = await messageToText(message);
                break;
            case 'image':
                replay = '收到图片消息';
                break;
            case 'voice':
                replay = '收到语音消息';
                break;
            case 'video':
                replay = '收到视频消息';
                break;
            case 'location':
                replay = '收到坐标消息';
                break;
            case 'link':
                replay = '收到链接消息';
                break;
            case 'file':
                replay = '收到文件消息';
                break;
            default: 
                replay = '回复"签到"试试~~' 
                break;
        }
        console.log(message);
        return replay;
    }
))

//文字消息分发
const messageToText = async (message = {}) => {
    let replay = '';
    let { ToUserName, FromUserName, Content } = message;
    switch(Content) {
        //签到
        case '签到': 
            //执行签到
            let signRet = await AppUserController.appUserSignIn(FromUserName, ToUserName)
            var data = {};
            if(signRet.status === 200) {
                let { newIntegral, user } = signRet.data;
                data.msg = {
                    "value":  signRet.msg,
                    "color": '#173177'
                }
                data.first = {
                    "value": newIntegral,
                    "color": '#173177'
                }
                data.second = {
                    "value": user.integral,
                    "color": '#173177'
                }
            } else {
                data.msg = {
                    "value":  signRet.msg,
                    "color": '#173177'
                }
                data.first = {
                    "value": "未知",
                    "color": '#173177'
                }
                data.second = {
                    "value": "未知",
                    "color": '#173177'
                }
            }
            //引入签到模板参数
            let { templateId, url, topColor } = signInTemp;
            // var data = {
            //     "msg": '',
            // };
            wechatApi.sendTemplate(FromUserName, templateId, url, topColor, data);
            break;
        //其他操作
        default: 
            replay = '回复"签到"试试~~'
    }
    return replay;
}


module.exports = router;