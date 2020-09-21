'use strict'
 
const Book = require('../models/book');
const User = require('../models/user');
var order; 
function addBook(req,res){
    const book = new Book();
    var params = req.body;
    var keywords = params.keyWords;
    var allTopics = params.topics;
    var words = keywords.split(',');
    var topics = allTopics.split(',');
 
    if (params.type && params.author && params.tittle && params.edition && params.description && params.topics && params.keyWords && params.copies && params.avaliables){ 
    if (params.type == "Book"){
        book.type = params.type
        book.author = params.author
        book.tittle = params.tittle 
        book.edition = params.edition
        book.description = params.description
        book.topics = topics
        book.keyWords = words
        book.copies = params.copies
        book.avaliables = params.avaliables;
        
       
        Book.find({
            $or: [
                {tittle: book.tittle}
            ]
        }).exec((err, existingBook)=>{
            if(err) return res.status(500).send({message: 'An error has occurred with the book request'})
            if(existingBook && existingBook.length>=1){
                return res.status(500).send({ message: 'The book exists already'})
            }else {
                book.save((err, bookSaved)=>{
                    if (err) return res.status(500).send({ message: 'Ops! Something failed. Please try again.' })
                    if (bookSaved) {
                        res.status(200).send({ message: 'Book registered successfully.', book: bookSaved })
                    } else {
                        res.status(404).send({ message: 'The book could not be added.' })
                    }
                })
            }
        })
    }else if (params.type == "Magazine") {
        if(params.currentFrequency && params.specimen){
            book.type = params.type
            book.author = params.author
            book.tittle = params.tittle 
            book.edition = params.edition
            book.description = params.description
            book.topics = topics
            book.keyWords = words
            book.copies = params.copies
            book.avaliables = params.avaliables
            book.specimen = params.specimen
            book.currentFrequency = params.currentFrequency;
    
            Book.find({
                $or: [
                    {tittle: book.tittle}
                ]
            }).exec((err, existingBook)=>{
                if(err) return res.status(500).send({message: 'An error has occurred with the magazine request'})
                if(existingBook && existingBook.length>=1){
                    return res.status(500).send({ message: 'The magazine exists already'})
                }else {
                    book.save((err, bookSaved)=>{
                        if (err) return res.status(500).send({ message: 'Ops! Something failed. Please try again.' })
                        if (bookSaved) {
                            res.status(200).send({ message: 'Magazine registered successfully.', book: bookSaved })
                        } else {
                            res.status(404).send({ message: 'The magazine could not be added.' })
                        }
                    })
                }
            })
        } else {
            res.status(500).send({ message: 'Have not been filled all the fields. Please fill it.' })
        }
    } else {
        res.status(500).send({message: 'The type entered is invalid.'})
    }
 } else {
            res.status(500).send({ message: 'Have not been filled all the fields. Please fill itt.' })
        }
}

function editBook(req,res){
    var bookId = req.params.idBook
    var keyword = req.body.keyWords
    var words = keyword.split(',');
    var params = req.body

    Book.findByIdAndUpdate(bookId, Book.keyWords = words ,{new:true},(err, bookUpdated)=>{
        if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
        if (!bookUpdated) return res.status(404).send({ message: 'The book has not been found.' })
        return res.status(200).send({bookUpdated})
    })
}

function deleteBook(req,res){
    var bookId = req.params.idBook
    Book.findByIdAndDelete(bookId,(err, bookDeleted)=>{
        if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
        if (!bookDeleted) return res.status(404).send({ message: 'The book has not been found.' })
        return res.status(200).send({bookDeleted})
    })

}

function getBookById(req, res) {
    var bookId = req.params.idBook
        Book.findById(bookId, (err, bookFound) => {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!bookFound) return res.status(404).send({ message: 'The book has not been found.' })
            return res.status(200).send({bookFound})
        })
}

function getBookByKeyWords(req, res) {
    var keyword = req.params.keyword
           Book.find({ 
            "keyWords":{
                "$regex" : keyword ,
                "$options" : "i"}}, (err, bookFound) => {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!bookFound) return res.status(404).send({ message: 'The book has not been found.' })
            return res.status(200).send({bookFound})
        })
}

function getBookByTopics(req, res) {
    var topic = req.params.topics
           Book.find({ 
            "topics":{
                "$regex" : topic ,
                "$options" : "i"}}, (err, bookFound) => {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!bookFound) return res.status(404).send({ message: 'The book has not been found.' })
            // if (bookFound == []) return res.status(500).send({message: 'Vacio jeje'})
            return res.status(200).send({bookFound})
        })
}


function getBookByTittle(req, res) {
    var tittle = req.params.tittle
        Book.find({ 
            tittle:{
                "$regex" : tittle,
                "$options" : "i"}}, (err, booksFound) => {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!booksFound) return res.status(404).send({ message: 'The book has not been found.' })
            return res.status(200).send({booksFound})
        })
}


function getBooksById(req,res){
    order = req.params.order;
    if (order === "ascendant") {
        Book.find().sort({_id : 1}).exec(function (err, booksFound) {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!booksFound) return res.status(404).send({ message: 'The books have not been found.' })
            return res.status(200).send({ booksFound })
        })
    }else if (order = "descendent"){
        Book.find().sort({_id:-1}).exec(function (err, booksFound) {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!booksFound) return res.status(404).send({ message: 'The books have not been found.' })
            return res.status(200).send({ booksFound })
      })
    }
}

function getBooksByCopies(req,res){
    order = req.params.order;
    if (order === "ascendant") {
        Book.find().sort({copies:1}).exec(function (err, booksFound) {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!booksFound) return res.status(404).send({ message: 'The books have not been found.' })
            return res.status(200).send({ booksFound })
        })
    }else if (order = "descendent"){
        Book.find().sort({copies:-1}).exec(function (err, booksFound) {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!booksFound) return res.status(404).send({ message: 'The books have not been found.' })
            return res.status(200).send({ booksFound })
        })
    }
}


function getBooksByAvaliables(req,res){
    order = req.params.order;
    if (order === "ascendant") {
        Book.find().sort({avaliables:1}).exec(function (err, booksFound) {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!booksFound) return res.status(404).send({ message: 'The books have not been found.' })
            return res.status(200).send({ booksFound })
        })
    }else if (order = "descendent"){
        Book.find().sort({avaliables:-1}).exec(function (err, booksFound) {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!booksFound) return res.status(404).send({ message: 'The books have not been found.' })
            return res.status(200).send({ booksFound })
        })
    }
}


function getBooks(req,res){

        Book.find((err, booksFound) => {
            if (err) return res.status(500).send({ message: 'An error has occurred with the book request.' })
            if (!booksFound) return res.status(404).send({ message: 'The books have not been found.' })
            return res.status(200).send({ booksFound })
        })  
}

//FALTA BUSQUEDA POR PALABRAS CLAVE y POR TÍTULO
module.exports = {
    addBook,
    editBook,
    deleteBook,
    getBookByTittle,
    getBookById,
    getBooksById,
    getBookByTopics,
    getBooksByCopies,
    getBooksByAvaliables,
    getBookByKeyWords,
    getBooks
}