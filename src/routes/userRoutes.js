const express = require('express');
const router = express.Router();

const userController = require('../controllers/userController');

router.get('/', userController.show)
router.get('/:user_id', userController.search);

module.exports = router