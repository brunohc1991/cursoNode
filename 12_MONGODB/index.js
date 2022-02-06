const express = require('express');
const exphbs = require('express-handlebars');
const conn = require('./db/conn');
const ProductsRoutes = require('./routes/productsRoutes')

const app = express()
const port = 3000

app.engine('handlebars', exphbs.engine());
app.set('view engine', 'handlebars');

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//public path
app.use(express.static('public'))

app.use('/products', ProductsRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))