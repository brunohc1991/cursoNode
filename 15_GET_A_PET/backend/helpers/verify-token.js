const jwt = require('jsonwebtoken');
const getToken = require('./get-token');

const checkToken = (req, res, next) => {

    const token = getToken(req);

    if(!token){
        return res.status(401).json({message:"Acesso negado, token não informado!"});
    }
    
    try {
        const verified = jwt.verify(token, 'secretAqui');
        req.user = verified;
        next();
    } catch (error) {
        return res.status(401).json({message:"Acesso negado, token inválido!"});
    }

}

module.exports = checkToken;