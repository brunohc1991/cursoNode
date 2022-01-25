import express from 'express';
import path from 'path';

const router = express.Router();


const basePath = path.join(path.resolve(path.dirname('')), 'templates');


router.get('/add', (req, resp,) => {
    resp.sendFile(`${basePath}/userForm.html`);
})

router.post('/save', (req, res) => {
    console.log(req.body)
})

router.get('/:id', (req, resp,) => {
    const id = req.params.id;

    console.log(`Buscando o usuario: ${id}`);
    resp.sendFile(`${basePath}/index.html`);
})

export default router;