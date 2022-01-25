import express from 'express';
import exphbs from 'express-handlebars';

const app = express();

const hbs = exphbs.create({
    partialsDir: ['views/partials'],
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.get('/dashboard', (req, res) =>{

    const itens = ['Banana', 'Laranja', 'Mamão'];

    res.render("dashboard", {itens: itens});
});

app.get('/post', (req, res) =>{
    const post = {
        title: "Aprender node.js",
        category: "Javascript",
        body: "Este artigo vai te ajudar a aprender node.js",
        coments: 4
    }

    res.render('blogPost', {post:post});
});

app.get('/blog', (req, res) => {
    const posts = [
        {
            title: "Aprender node.js",
            category: "Javascript",
            body: "Este artigo vai te ajudar a aprender node.js",
            coments: 4
        },
        {
            title: "Aprender Java",
            category: "Java",
            body: "Este artigo vai te ajudar a aprender Java",
            coments: 1
        },
        {
            title: "Aprender node.flutter",
            category: "Flutter",
            body: "Este artigo vai te ajudar a aprender flutter",
            coments: 4}
    ];

    res.render("blog", {posts});
})


app.get('/', (req, res) =>{

    const user = {
        name: "Bruno",
        surName: "Costa"
    }

    const palavra = 'teste';

    const auth = true;

    const approved = false;

    res.render('home', {user: user, palavra: palavra, auth:auth, approved: approved});
});

app.listen(3000, ()=>{
    console.log('App funcionando')
})