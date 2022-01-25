import express from 'express';
import exphbs from 'express-handlebars';
import pool from './db/conn.mjs'

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

app.get("/", (req,res) =>{
    res.render('home');
});

app.post('/books/inertbooks', (req, res) => {
    const title = req.body.title;
    const pages = req.body.pages;

    const query = `INSERT INTO BOOKS (??, ??) values (?, ?)` ;

    const data = ['title', 'pages_num', title, pages]

    pool.query(query, data , (err) =>{
        if(err){
            console.log(err);
        }

        res.redirect('/books');
    });
})

app.get('/books', (req, res) => {
    const sql = `SELECT * FROM BOOKS`;

    pool.query(sql, (err, data) =>{
        if(err){
            console.log(err);
            return
        } 

        const books = data;

        res.render('books', {books});
    })
})

app.get('/books/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM BOOKS WHERE ?? = ?`;

    const data = ['id', id]
    pool.query(sql, data, (err, data) =>{
        if(err){
            console.log(err);
            return
        } 

        const book = data[0];

        res.render('book', {book});
    });
})

app.get('/books/edit/:id', (req, res) => {
    const id = req.params.id;
    const sql = `SELECT * FROM BOOKS WHERE ?? = ?`;

    const data = ['id', id]

    pool.query(sql, data, (err, data) =>{
        if(err){
            console.log(err);
            return
        } 

        const book = data[0];

        res.render('editbook', {book});
    });
})

app.post('/books/updatebook', (req, res)=>{
    const id = req.body.id;
    const title = req.body.title;
    const pages = req.body.pages;

    const query = `UPDATE BOOKS SET ?? = ?, ?? = ? WHERE ?? = ?` ;

    const data = ['title', title, 'pages_num', pages,'id', id]

    pool.query(query, data, (err) =>{
        if(err){
            console.log(err);
        }

        res.redirect('/books');
    });
});

app.post('/books/delete/:id', (req, res)=>{
    const id = req.params.id;
    const sql = `DELETE FROM BOOKS WHERE ?? = ?`;

    const data = ['id', id]

    pool.query(sql, data, (err, data) =>{
        if(err){
            console.log(err);
            return
        } 

        res.redirect('/books');
    });
})

app.listen(3000, ()=>{
    console.log('App funcionando')
})
