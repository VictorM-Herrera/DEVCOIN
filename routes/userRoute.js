const express = require("express");
const router = express.Router();
const userController = require('../controllers/user.controller');
const { ValidateUser } = require('../models/user.model');

//gets:
router.get('/', userController.getAllUsers);//funciona
router.get('/:hexCode', userController.getUserByHexCode);//funciona
// router.get('/activeOnly', userController.getAllUsersActive);


//Posts
router.post('/', [ValidateUser],userController.createUser);//funciona
router.post('/logIn/', userController.logInUser);//funciona
router.post('/recover', userController.sendRecoverMail);//funciona

//updates
router.put('/:hexCode', userController.updateUserByHexCode);//funciona
router.patch('/:email', userController.verifyAccount);//funciona
router.put('/recoverPass/:email', userController.recoverPassword);//funciona

//deletes
router.delete('/:hexCode', userController.deleteUserByHexCode);

module.exports = router;