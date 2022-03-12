const User = require('../models/user');
const bcrypt = require('bcrypt');
const createUserToken = require('../helpers/create-user-token');
const getToken = require('../helpers/get-token');
const getUserByToken = require('../helpers/get-user-by-token');
const jwt = require('jsonwebtoken');

module.exports = class UserController{
    static async register(req, res){
        const {name, email, phone, password, confirmPassword} = req.body;

        //validacoes
        if(!name){
            res.status(422).json({message: "O campo nome é obrigatório"})
            return;
        };
        if(!email){
            res.status(422).json({message: "O campo email é obrigatório"})
            return;
        };
        if(!phone){
            res.status(422).json({message: "O campo telefone é obrigatório"})
            return;
        };
        if(!password){
            res.status(422).json({message: "O campo senha é obrigatório"})
            return;
        };
        if(!confirmPassword){
            res.status(422).json({message: "O campo de confirmação de senha é obrigatório"})
            return;
        };
        if(password !== confirmPassword){
            res.status(422).json({message: "O campo de senha e confirmação de senha estão diferentes"})
            return;
        };
        
        const userExists = await User.findOne({email:email});
        
        if(userExists){
            res.status(422).json({message: "Já existe um usuário com este e-mail"})
            return;
        }

        //criando senha
        const salt = await bcrypt.genSalt(12);
        const passwordHash = await bcrypt.hash(password, salt);

        //criar user
        const user = new User({
            name,
            email,
            phone,
            password: passwordHash
        });

        try {
            const userSaved = await user.save();
            await createUserToken(userSaved, req, res);
        } catch (error) {
            res.status(500).json({message:error});
            return;
        }


    }

    static async login(req, res){
        const {email, password} = req.body;

        if(!email || !password){
            res.status(422).json({message: "Email e/ou senha são obrigatórios para realizar o login"});
            return;
        }

        //verifica existencia de usuario por login
        const user = await User.findOne({email:email});
        if(!user){
            res.status(422).json({message: "Não existe um usuário com este e-mail"})
            return;
        }

        //Validação de senha
        const checkPass = await bcrypt.compare(password, user.password);

        if(!checkPass){
            res.status(422).json({message: "Senha inválida!"})
            return;
        }

        await createUserToken(user, req, res);
    }

    static async checkUser(req, res){
        let user = null;
        
        if(req.headers.authorization){
            const token = getToken(req);
            const decodedToken = jwt.verify(token, 'secretAqui');

            user = await User.findById(decodedToken.id);
            user.password = undefined;

        }

        res.status(200).send(user);
    }

    static async getUserByID(req, res){
        const id = req.params.id;
        const user = await User.findById(id).select('-password');

        if(!user){
            res.status(422).json({message: "Usuário não encontrado!"});
            return;
        }

        res.status(200).json({user});
        return;
    }

    static async editUser(req, res){
        const id = req.params.id;

        const {name, email, phone, password, confirmPassword} = req.body;

        

        const token = getToken(req);
        const user = await getUserByToken(token);

        if(!user){
            res.status(422).json({message: "Usuário não encontrado!"});
            return;
        }

        if(req.file){
            user.img = req.file.filename;
        }

        //validacoes
        if(!name){
            res.status(422).json({message: "O campo nome é obrigatório"})
            return;
        };

        user.name = name;

        if(!phone){
            res.status(422).json({message: "O campo telefone é obrigatório"})
            return;
        };
        user.phone = phone;

        if(password != null && password !== confirmPassword){
            res.status(422).json({message: "O campo de senha e confirmação de senha estão diferentes"})
            return;
        } else if (password != null && password === confirmPassword){
            const salt = await bcrypt.genSalt(12);
            const passwordHash = await bcrypt.hash(password, salt);

            user.password = passwordHash;
        }
                
        if(!email){
            res.status(422).json({message: "O campo email é obrigatório"})
            return;
        };

        const userExists = await User.findOne({email:email});
        
        if(user.email !== email && userExists){
            res.status(422).json({message: "Já existe um usuário com este e-mail"})
            return;
        }

        user.email = email;

        try {
            await User.findOneAndUpdate(
                    {_id:user.id},
                    {$set: user},
                    {new:true}
                )
            res.status(200).json({message:"Usuário atualizado com sucesso!"})
        } catch (error) {
            res.status(500).json({message:error});
            return;
        }
        
    }
}