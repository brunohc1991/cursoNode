import db from '../db/conn.mjs'
import DataTypes from 'sequelize';

const Task = db.define("Task", {
    title: {
        type: DataTypes.STRING,
        require: true
    },
    description: {
        type: DataTypes.STRING,
        require: true
    },
    done: {
        type: DataTypes.BOOLEAN,
        require: true
    },
});

export default Task;