module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('goods_key', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        goodsId: {
            type: DataTypes.INTEGER,
            allowNumll: true,
            field: 'goods_id',
            comment: '商品id'
        },
        goodsKey: {
            type: DataTypes.STRING,
            field: 'goods_key',
            comment: '卡密内容',
        },
        goodsKeyStatus: {
            type: DataTypes.INTEGER,
            field: 'goods_key_status',
            defaultValue: 0,
            comment: '卡密状态, 0：未出售，1：已出售',
        }
    }, {
        //自动添加timestamp的功能，createAt、updateAt
        timestamps: true
    })
} 