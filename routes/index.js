const router = require('koa-router')();
const GoodsTypeController = require('../package/controllers/goodsType.js');
const GoodsController = require('../package/controllers/goods.js');
const GoodsKeyController = require('../package/controllers/goodsKey.js');
const GoodsExchangeController = require('../package/controllers/goodsExchange.js');
const AppUserController = require('../package/controllers/appUser.js');
const AppTokenController = require('../package/controllers/appToken.js');

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: '积分商城'
  })
})
router.get('/user', async (ctx, next) => {
  await ctx.render('user', {
    title: '用户中心'
  })
})

router.get('/string', (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/json', (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})
router.get('/add', async (ctx, next) => {
  await GoodsTypeController.addGoodsType(ctx);
})
router.get('/update', async (ctx, next) => {
  await GoodsTypeController.updateGoodsType(ctx);
})
router.get('/addGoods', async (ctx, next) => {
  await GoodsController.addGoods(ctx);
})
router.get('/updateGoods/:id', async (ctx, next) => {
  await GoodsController.updateGoods(ctx);
})
router.get('/addGoodsKey', async (ctx, next) => {
  await GoodsKeyController.addGoodsKey(ctx);
})
router.get('/updateGoodsKeySaled/:id', async (ctx, next) => {
  await GoodsKeyController.updateGoodsKeySaled(ctx);
})
router.get('/addGoodsExchange', async (ctx, next) => {
  await GoodsExchangeController.addGoodsExchange(ctx);
})
router.get('/addAppUser', async (ctx, next) => {
  await AppUserController.addAppUser(ctx);
})
router.get('/getAppToken', async (ctx, next) => {
  await AppTokenController.getAppToken(ctx);
})

module.exports = router
