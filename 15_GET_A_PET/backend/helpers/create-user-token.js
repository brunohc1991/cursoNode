const jwt = require('jsonwebtoken')


const createUserToken = async(user, req, res) => {
    const token = jwt.sign({
        name: user.name,
        id: user.id
    },"secretAqui");

    res.status(200).json({
            message: "você esta autenticado",
            token: token,
            userId: user.id,
        })
};

module.exports = createUserToken