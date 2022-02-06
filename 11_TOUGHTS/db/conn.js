const sequelize = require('sequelize');

const seq = new sequelize('toughts', 'root', 'knacker1991', {
    host:'localhost',
    dialect: 'mysql'
})

try {
    seq.authenticate();
    console.log('conectado com sucesso!')
} catch (error) {
    console.log(error)
}

module.exports = seq;

