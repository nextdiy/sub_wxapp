module.exports = function(Sequelize, DataTypes) {
    return Sequelize.define('app_token', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        tokenName: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: 'access_token',
            field: 'name',
            comment: 'token名称',
        },
        tokenValue: {
            type: DataTypes.STRING,
            allowNull: true,
            field: 'token',
            comment: 'token值',
        },
        tokenExpired: {
            type: DataTypes.DATE,
            allowNull: true,
            field: 'expired',
            comment: 'token时效',
        }
    }, {
        //自动添加timestamp的功能，createAt、updateAt
        timestamps: true
    })
}