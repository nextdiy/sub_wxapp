const router = require('koa-router')();
const wechat = require('co-wechat');
const wechatConfig = require('../config/wechat.js');
const WechatAPI = require('co-wechat-api');
const wechatApi = new WechatAPI(wechatConfig.appid, wechatConfig.appsecret);

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
                replay = await messageToEvent(message);
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
            let signMsg = '', signIntegral = 0, description = '';
            if(signRet.status === 200) {
                let { newIntegral, isNew } = signRet.data;
                signIntegral = newIntegral;
                signMsg = signRet.msg;
                description = "获得积分：" + signIntegral;
                if(isNew) {
                    description = description + "\t\n" + "新人首次签到 +1000";
                }
            } else {
                signMsg = signRet.msg;
                description = "请明天再来吧，积分可以用来兑换礼品~~"
            }
            //回复图文
            replay = [{
                "title": signMsg,
                "description": description,
                "url": "http://subapp.free.idcfengye.com/user",
                "picurl": "http://subapp.free.idcfengye.com/images/member.png"
            }];
            break;
        case '积分商城': 
            //回复图文
            replay = [{
                "title": "积分商城",
                "description": "每天坚持签到，兑换更好的礼品~~",
                "url": "http://subapp.free.idcfengye.com/",
                "picurl": "http://subapp.free.idcfengye.com/images/store.png"
            }];
            break;
        //其他操作
        default: 
            replay = '系统维护中~ 请明早再来~~'
    }
    return replay;
}

//事件消息分发
const messageToEvent = async (message = {}) => {
    let replay = '收到事件消息';

    //判断
    switch(message.Event) {
        case 'CLICK':
            replay = replay + message.EventKey;
            break;
        default:
            replay = replay + '其他事件' + message.EventKey;
            break;
    }
    return replay
}


module.exports = router;