import sequelize from 'sequelize';

const seq = new sequelize('sequelizemysql', 'root', 'knacker1991', {
    host:'localhost',
    dialect: 'mysql'
})

// try {
//     seq.authenticate();
//     console.log('conectado com sucesso!')
// } catch (error) {
//     console.log(error)
// }
export default seq;

