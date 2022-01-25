import express from 'express';
import exphbs from 'express-handlebars';
import conn from './db/conn.mjs';
import User from './models/user.mjs';
import Address from './models/address.mjs';
import Addres from './models/address.mjs';

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

app.get("/users/create", (req, res) =>{
    res.render('adduser')
});

app.post("/users/create", async (req, res) =>{
    const name = req.body.name;
    const occupation = req.body.occupation;
    let newsletter = (req.body.newsletter === 'on');

    await User.create({name, occupation, newsletter});

    res.redirect('/');

});

app.post("/address/create", async (req, res) =>{
    const street = req.body.street;
    const number = req.body.number;
    const city = req.body.city;
    const UserId = req.body.UserId;

    await Addres.create({street, number, city, UserId});

    res.redirect(`/users/update/${UserId}`);

});

app.get("/users/:id", async (req,res) =>{
    const id = req.params.id;
    const user = await User.findOne({raw:true, where:{id:id}})

    res.render('userview',{user:user});
});

app.post("/users/delete/:id", async (req,res) =>{
    const id = req.params.id;
    await User.destroy({where:{id:id}});

    res.redirect("/");
});

app.post("/users/update", async (req,res) =>{
    const id = req.body.id;
    const name = req.body.name;
    const occupation = req.body.occupation;
    const newsletter = (req.body.newsletter === 'on');

    const userData = {
        id, name, occupation, newsletter
    }

    await User.update(userData, {where:{id:id}})

    res.redirect("/");
});

app.get("/users/update/:id", async (req,res) =>{
    const id = req.params.id;
    const user = await User.findOne({include: Addres, where:{id:id}});

    res.render("edituser", {user:user.get({plain: true})})
});

app.post("/address/delete", async (req,res) => {
    const id = req.body.id;
    const UserId = req.body.UserId;

    await Addres.destroy({where: {id:id}});

    res.redirect(`/users/update/${UserId}`);

})

app.get("/", async (req,res) =>{
    const users = await User.findAll({raw:true})
    res.render('home', {users:users});
});


conn
.sync()
// .sync({force:true})
.then(() =>{
    app.listen(3000, ()=>{
        console.log('App funcionando')
    })
}).catch(err => console.log(err));