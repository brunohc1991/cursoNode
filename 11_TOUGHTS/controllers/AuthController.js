const User = require('../models/User')
const bcrypt = require('bcryptjs')

module.exports = class AuthController {
    static async login(req, res){
        res.render('auth/login')
    }

    static async loginPost(req, res){
        const {email, senha} = req.body;

        const user = await User.findOne({where: {email:email}})

        if(!user){
            req.flash('message', "Usuario não encontrado.");
            res.render('auth/login')
            return
        }

        const passMatch = bcrypt.compareSync(senha, user.senha)

        if(!passMatch){
            req.flash('message', "Senha inválida.");
            res.render('auth/login')
            return
        }

        req.session.userid = user.id;
            req.flash('message', "Login realizado com sucesso.");

            req.session.save(() => {
                res.redirect('/');
            })
    }

    static async register(req, res){
        res.render('auth/register')
    }

    static async registerPost(req, res) {
        const { name, email, password, confirmpassword } = req.body
               
        //valida senha
        if(password != confirmpassword){
            req.flash('message', "As senhas não são iguais, favor recadastrar.");
            res.render('auth/register')
            return
        }

        //email duplicado
        const checkUserExists = await User.findOne({where:{email:email}})

        if(checkUserExists){
            req.flash('message', "O e-mail já esta sendo utilizado.");
            res.render('auth/register')
            return
        }

        //create a password
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        const user = {
            name, email, senha: hashPass
        }

        try {
            const cratedUser = await User.create(user);

            req.session.userid = cratedUser.id;
            req.flash('message', "Cadastro realizado com sucesso.");

            req.session.save(() => {
                res.redirect('/');
            })

        } catch (error) {
            console.log(error)
        }
    }

    static logout(req, res){
        req.session.destroy();
        res.redirect('/login');
    }

}