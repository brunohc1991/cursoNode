const express = require('express')
const app = express()
const port = 3000

app.use(
    express.urlencoded({
        extended:true
    })
);

app.use(express.json())

app.get('/', (req, res) =>{
    res.status(200).json({message: "Primeira rota criada com sucesso"})
});

app.post('/createProduct', (req, res) => {

    const name = req.body.name
    const price = req.body.price

    if(!name){
        res.status(422).json({message:"O campo name é obrigatorio!"})
        return;
    }

    console.log(`Nome: ${name} | Preço R$ ${price}`);

    res.status(201).json({message:"Produto inserido com sucesso"})
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))