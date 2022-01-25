import db from '../db/conn.mjs'
import DataTypes from 'sequelize';
import User from './user.mjs';

const Addres = db.define('Addres', {
    street: {
        type: DataTypes.STRING,
        require:true
    },
    number: {
        type: DataTypes.STRING,
        require:true
    },
    city: {
        type: DataTypes.STRING,
        require:true
    },
});

User.hasMany(Addres)
Addres.belongsTo(User)

export default Addres;
