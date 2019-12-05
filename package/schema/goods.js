module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('good', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        icon: {
            type: DataTypes.STRING,
            field: 'goods_icon',
            comment: '商品图标',
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'goods_name',
            comment: '商品名称',
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false,
            field: 'goods_price',
            defaultValue: 1,
            comment: '兑换价格',
        },
        account: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'goods_account',
            comment: '账号',
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'goods_password',
            comment: '密码',
        },
        remark: {
            type: DataTypes.STRING(200),
            field: 'goods_remark',
            comment: '备注',
        },
        limit: {
            type: DataTypes.INTEGER,
            field: 'goods_limit',
            defaultValue: 1,
            comment: '限制用户只能领取数量为1, -1：不限制，0：不能领取',
        },
        shared: {
            type: DataTypes.INTEGER,
            field: 'goods_shared',
            defaultValue: 0,
            comment: '当前分享次数',
        },
        maxShared: {
            type: DataTypes.INTEGER,
            field: 'goods_max_shared',
            defaultValue: 1,
            comment: '最大分享次数，默认为1',
        },
        // createdAt: {
        //     type: Sequelize.DATE,
        //     field: 'created_at',
        // },
        // updatedAt: {
        //     type: Sequelize.DATE,
        //     field: 'updated_at',
        // },
    }, {
        //自动添加timestamp的功能，createAt、updateAt
        timestamps: true
    })
}