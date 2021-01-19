const express = require('express');
const router = express.Router();

const pokemonController = require('../controllers/pokemonController');

router.get('/', pokemonController.list);
router.post('/add', pokemonController.save);
router.get('/delete/:id', pokemonController.delete);

router.get('/update/:id', pokemonController.edit);
router.post('/update/:id', pokemonController.update);

module.exports = router;