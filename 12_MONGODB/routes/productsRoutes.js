const express = require('express');
const { route } = require('../../11_TOUGHTS/routes/toughtsRoutes');
const router = express.Router();

const ProductController = require('../controllers/ProductController');

router.get('/create', ProductController.createProdutc);
router.post('/create', ProductController.createProdutcPost);
router.post('/remove/:id', ProductController.removeProduct);
router.get('/edit/:id', ProductController.editProduct);
router.post('/edit', ProductController.editProductPost);
router.get('/:id', ProductController.getProdutc);
router.get('/', ProductController.showProducts);

module.exports = router;
