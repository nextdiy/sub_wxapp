module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('goods_exchange',{
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        goodsId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'goods_id',
            comment: '商品id',
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            field: 'user_id',
            comment: '用户id',
        },
        exchangePrice: {
            type: DataTypes.BIGINT,
            field: 'exchange_price',
            comment: '兑换价格',
        }
    }, {
        //自动添加timestamp的功能，createAt、updateAt
        timestamps: true
    })
}