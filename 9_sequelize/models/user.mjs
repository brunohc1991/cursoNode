import coon from '../db/conn.mjs'
import DataTypes from 'sequelize';

const user = coon.define('User', {
    name:{
        type: DataTypes.STRING,
        allowNull:false
    },
    occupation:{
        type: DataTypes.STRING,
        required:true
    },
    newsletter:{
        type: DataTypes.BOOLEAN
    },
});

export default user