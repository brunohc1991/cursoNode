const express = require('express');
const router = express.Router();
const ToughtController = require('../controllers/ToughtController');
const checkAuth = require('../helpers/auth').checkAuth;



router.get('/dashboard', checkAuth, ToughtController.dashboard)
router.post('/remove', checkAuth, ToughtController.removeTought)
router.get('/add', checkAuth, ToughtController.createTought)
router.get('/edit/:id', checkAuth, ToughtController.editTought)
router.post('/edit', checkAuth, ToughtController.editToughtPost)
router.post('/add', checkAuth, ToughtController.createToughtPost)
router.get('/', ToughtController.showToughts)

module.exports = router;