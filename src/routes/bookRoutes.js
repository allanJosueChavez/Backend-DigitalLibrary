'use strict'
const md_auth = require('../middlewares/authenticated');
const express = require('express');
const api = express.Router();

var bookController = require('../controllers/bookController');

api.post('/addBook',md_auth.ensureAuth, bookController.addBook);
api.put('/editBook/:idBook',md_auth.ensureAuth, bookController.editBook);
api.delete('/deleteBook/:idBook',md_auth.ensureAuth, bookController.deleteBook);
api.get('/getBookById/:idBook',md_auth.ensureAuth, bookController.getBookById);
api.get('/getBookByTittle/:tittle',md_auth.ensureAuth, bookController.getBookByTittle);
api.get('/getBookByTopics/:topics',md_auth.ensureAuth, bookController.getBookByTopics);
api.get('/getBookByKeyWords/:keyword',md_auth.ensureAuth, bookController.getBookByKeyWords);
api.get('/getBooksById/:order',md_auth.ensureAuth, bookController.getBooksById);
api.get('/getBooksByCopies/:order',md_auth.ensureAuth, bookController.getBooksByCopies);
api.get('/getBooksByAvaliables/:order',md_auth.ensureAuth, bookController.getBooksByAvaliables);
api.get('/getBooks',md_auth.ensureAuth, bookController.getBooks);


module.exports = api; 