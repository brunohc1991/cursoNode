const jwt = require("jsonwebtoken");
const User = require('../models/user');

const getUserByToken = async (token) =>{

    if(!token){
        return res.status(404).json({message:"Acesso negado!"});
    }

    const decoded = jwt.verify(token, 'secretAqui');

    const userId = decoded.id;
    const user = await User.findById({_id:userId});

    return user;
}

module.exports = getUserByToken;
