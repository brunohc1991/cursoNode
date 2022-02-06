const Tought = require('../models/Tought');
const User = require('../models/User');
const { Op } = require('sequelize')

module.exports = class ToughtController {
    static async showToughts(req, res){

        let search = "";
        let order = "DESC";

        if(req.query.search){
            search = req.query.search;
        }
        
        if(req.query.order){
            order = req.query.order;
        }

        const toughtsData = await Tought.findAll({
            include: User,
            where: {
                title: {[Op.like]:`%${search}%`}
            },
            order: [['createdAt', order]]
        });

        const toughts = toughtsData.map((result) => result.get({plain: true}))
        let toughtsQty = toughts.length;
        if(toughtsQty === 0){
            toughtsQty = false;
        }
        res.render('tought/home', {toughts, search, toughtsQty})
    }

    static async dashboard(req, res){
        const UserId = req.session.userid;

        const user = await User.findOne({
                where:{id:UserId},
                include: Tought,
                plain: true
            });

        if(!user){
            res.redirect('/login');
        }

        const toughts = user.Toughts.map((result) => result.dataValues);

        let emptyToughts = toughts.length == 0;

        res.render('tought/dashboard', {toughts, emptyToughts})
    }

    static async createToughtPost(req, res){
        const tought = {
            title : req.body.title,
            UserId: req.session.userid
        };

        try {
            await Tought.create(tought);
            req.flash('message', "Pensamento criado com sucesso.");
            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        } catch (error) {
            
        }
    }

    static createTought(req, res){
        res.render('tought/create')
    }

    static async editTought(req, res){
        const id = req.params.id;

        const tought = await Tought.findOne({where: {id:id}, raw:true});

        res.render('tought/edit', {tought});

    }

    static async editToughtPost(req, res){

        const id = req.body.id;

        const tought = {
            title: req.body.title,
        }

        try {
            await Tought.update(tought, {where:{id:id}});
            req.flash('message', "Pensamento atualizado com sucesso.");
            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            });
        } catch (error) {
            console.log(error)
        }

    }

    static async removeTought(req, res){
        const id = req.body.id;
        const UserId = req.session.userid;

        try {
            await Tought.destroy({where:{id:id, userId:UserId}});
            req.flash('message', "Pensamento excluido com sucesso.");
            req.session.save(() => {
                res.redirect('/toughts/dashboard');
            })
        } catch (error) {
            console.log(error)
        }
    }
}