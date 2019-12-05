module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define('app_user', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        openid: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'openid',
            comment: '用户openid',
        },
        nickName: {
            type: DataTypes.STRING,
            field: 'nick_name',
            comment: '用户名', 
        },
        signTime: {
            type: DataTypes.DATE,
            field: 'sign_time',
            comment: '上一次签到时间'
        },
        integral: {
            type: DataTypes.BIGINT,
            field: 'integral',
            defaultValue: 0,
            comment: '积分',
        },
        exchange: {
            type: DataTypes.INTEGER,
            field: 'exchange',
            defaultValue: 1,
            comment: '可兑换次数'
        }
    }, {
        //自动添加timestamp的功能，createAt、updateAt
        timestamps: true
    })
}