module.exports = function (Sequelize, DataTypes) {
    return Sequelize.define('goods_type', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: true,
            autoIncrement: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            field: 'name',
            comment: '商品类型'
        },
    }, {
        //自动添加timestamp的功能，createAt、updateAt
        timestamps: true
    })
}