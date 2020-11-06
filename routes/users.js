const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const {check} = require('express-validator');

//crea un usuario
//endpoint => /api/users/
router.post('/',[
    check('name', 'The Name is must').not().isEmpty(),
    check('email', 'The Email is must').not().isEmpty(),
    check('password', 'The Password must be longer than 5 keys').isLength({min:6}),

], userController.createUser);


module.exports = router;