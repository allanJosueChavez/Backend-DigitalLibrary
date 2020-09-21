'use strict'
const md_auth = require('../middlewares/authenticated');
const express = require('express');
const api = express.Router();

var userController = require('../controllers/userController');
// var bookController = require('../controllers/bookController');

//api.post('/commands/:action', controller.commands);
// api.post('/commands',md_auth.ensureAuth, userController.commands);
// api.post('/commands',md_auth.ensureAuth, bookController.commands);

api.post('/login', userController.login)
api.post('/addUser',md_auth.ensureAuth, userController.addUser);
api.put('/editUser/:idUser',md_auth.ensureAuth, userController.editUser);
api.delete('/deleteUser/:idUser',md_auth.ensureAuth, userController.deleteUser);
api.get('/getUserById/:idUser',md_auth.ensureAuth, userController.getUserById);
api.get('/getUsersById',md_auth.ensureAuth, userController.getUsersById);
api.get('/getUsersByName/:order',md_auth.ensureAuth, userController.getUsersByName);
api.get('/getUsersByLastName/:order',md_auth.ensureAuth, userController.getUsersByLastName);
api.get('/getUsersByCarnet_CUI/:order',md_auth.ensureAuth, userController.getUsersByCarnet_CUI);
api.get('/getUsersByRol/:order',md_auth.ensureAuth, userController.getUsersByRol);
api.get('/getUsersByPassword/:order',md_auth.ensureAuth, userController.getUsersByPassword);
api.get('/getUsers',md_auth.ensureAuth, userController.getUsers);


module.exports = api; 
