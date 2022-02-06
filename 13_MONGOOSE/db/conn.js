const mongoose = require('mongoose');

async function main(){
    await mongoose.connect('mongodb://localhost:27017/testemongose2');
    console.log('Conectaco com mongoose')
}

main().catch((err) => console.log(err));

module.exports = mongoose;