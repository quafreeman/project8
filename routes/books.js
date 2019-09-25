//Require express
const express = require('express');
const router = express.Router();

//Book model
const Book = require("../models").Book;

//GET books listing will retrieve all books from desc order. 
router.get('/', function (req, res, next) {
    let pg = req.query.page;
    Book.findAll({ orderBy: [["createdAt", "DESC"]] }).then(function (books) {
        res.render("index", { books: books });
    }).catch(function (error) {
        res.send(500, error);
    });
});



//GET - Display the create new book form
router.get('/new', (req, res) =>
    res.render('new_book', { book: Book.build(), pageTitle: "New Book" })
);

//POST - Posts a new book to the database
router.post('/new', (req, res, next) => {
    Book.create(req.body).then(function (book) {
        let { title, author, genre, year } = req.body;
        res.redirect('/')       // after creating book, goes back to home page
    })
        .catch(err => {
            if (err.name === "SequelizeValidationError") {
                // console.log('Sequelize Validation Error thrown');
                res.render('new_book', {
                    book: Book.build(req.body),
                    pageTitle: "New Book",
                    errors: err.errors
                })
            } else {
                throw error;
            }
        }).catch(function (error) {
            res.send(500, error);
        });
});

//GET /books/:id - shows the book detail form
router.get('/:id', (req, res, next) => {
    Book.findByPk(req.params.id)
        .then(book => {
            if (book) {
                const pageTitle = book.dataValues.title;
                const { id, title, author, genre, year } = book.dataValues;

                const templateData = {
                    pageTitle,
                    id,
                    title,
                    author,
                    genre,
                    year
                };

                res.render('update-book', templateData);
            } else {
                res.render('page_not_found', { pageTitle: "Page Not Found" });
            }
        })
        .catch(err => {
            res.render('error');
            res.send(500);
        });
});

//Updates book info in the database
router.post('/:id', (req, res, next) => {
    Book.findByPk(req.params.id)
        .then(book => {
            if (book) {
                return book.update(req.body);
            } else {
                res.render('page_not_found', { pageTitle: "Page Not Found" });
            }
        })
        .then(book => res.redirect(/books/))        // after update is submitted takes you to the home page
        .catch(err => {
            if (err.name === "SequelizeValidationError") {
                let book = Book.build(req.body);
                book.id = req.params.id;

                res.render('update-book', {
                    book: book,
                    pageTitle: book.dataValues.title,
                    errors: err.errors
                })
            } else {
                res.render('error', { pageTitle: "Server Error" });
            }
        });
});

//Deletes 

router.post("/:id/delete", function (req, res, next) {
    Book.findByPk(req.params.id).then(function (book) {
        if (book) {
            return book.destroy();
        } else {
            res.send(404)
        }
    }).then(function (books) {
        res.redirect("/books");
    }).catch(function (error) {
        res.send(500, error);
    })
});

router.get("/error", function (req, res, next) {
    return res.render('error')
})



module.exports = router;