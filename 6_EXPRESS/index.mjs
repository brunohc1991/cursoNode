import express from 'express';
import path from 'path';
import users from './users/index.mjs';

const app = express();
const port = 3000;

const basePath = path.join(path.resolve(path.dirname('')), 'templates');

//const checkAuth = function(req, res, next){
//    req.authStatus = false;

//    if(req.authStatus){
//        console.log('Esta logado')
//        next();
//    } else {
//        console.log('Não esta logado')
//        next()
//    }
//}


//app.use(checkAuth);

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

//arquivos estaticos
app.use(express.static('public'))

app.use('/users', users);

app.get('/', (req, resp,) => {
    resp.sendFile(`${basePath}/index.html`);
})

app.use(function(req, res) {
    res.status(404).sendFile(`${basePath}/404.html`);
});

app.listen(port, () => {
    console.log(`app rodando na porta ${port}`);
});