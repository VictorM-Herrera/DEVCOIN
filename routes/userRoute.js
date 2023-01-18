const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');
const { ValidateUser } = require('../models/user.model');

//gets:
router.get('/', userController.getAllUsers);
router.get('/:hexCode', userController.getUserByHexCode);
router.get('/recover', userController.sendRecoverMail);

//Posts
router.post('/', [ValidateUser],userController.createUser);
router.post('/logIn/', userController.logInUser);

//updates
router.put('/:hexCode', userController.updateUserByHexCode);
router.patch('/:email', userController.verifyAccount);
router.put('/recoverPass/:email', userController.recoverPassword);

//deletes
router.delete('/:hexCode', userController.deleteUserByHexCode);

module.exports = router;