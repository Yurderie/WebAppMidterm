// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/details', (req, res, next) => {

  res.render('books/details',{
    title:'Add Book',
    books:{
      "Title": null,
      "Description": null,
      "Price": null,
      "Author": null,
      "Genre": null

    }
})

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/details', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    {
      let newBook = book({
        "Title": req.body.Title,
        "Description":req.body.Description,
        "Price":req.body.Price,
        "Author":req.body.Author,
        "Genre":req.body.Genre
      });
      book.create(newBook,(err,Book)=>{
          if(err)
          {
              console.log(err);
              res.end(err);
          }
          else
          {
          res.redirect('/books');
          }
      });
      }

});

// GET the Book Details page in order to edit an existing Book
router.get('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
            book.findById(id,(err,bookToEdit)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.render('books/details',{title:'Edit Book', books: bookToEdit});
                }
            
            });
});

// POST - process the information passed from the details form and update the document
router.post('/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id
            console.log(req.body);
            let updatedBook = book({
                "_id":id,
                "Title":req.body.Title,
                "Description":req.body.Description,
                "Price":req.body.Price,
                "Author":req.body.Author,
                "Genre":req.body.Genre
            });
            book.updateOne({_id:id}, updatedBook,(err)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/books');
                }
            });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
    let id = req.params.id;
            book.remove({_id:id},(err)=>{
                if(err)
                {
                    console.log(err);
                    res.end(err);
                }
                else
                {
                    res.redirect('/books');
                }
                
            });
});


module.exports = router;
