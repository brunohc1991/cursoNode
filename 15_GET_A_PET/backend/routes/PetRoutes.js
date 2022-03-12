const router = require('express').Router();
const PetController = require('../controllers/PetController');


//middlewares
const verifyToken = require('../helpers/verify-token');
const { imageUpload } = require('../helpers/image-upload') 

router.post('/create', verifyToken, imageUpload.array('images'),PetController.create);
router.get('/', PetController.getAll);
router.get('/mypets', verifyToken, PetController.getAllUserPets);
router.get('/myadoptions', verifyToken, PetController.getAllMyAdoptions);
router.get('/:id', PetController.getByID);
router.delete('/:id', verifyToken, PetController.deleteByID);
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet);
router.patch('/schedule/:id', verifyToken, PetController.schedule);
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption);


module.exports = router;