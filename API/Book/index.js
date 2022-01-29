
// Initializing express router
const Router= require("express").Router();

// Importing models
const BookModel=require("../../database/book")

/*
Route: /
Description: to get all books
Access: public
Parameters: NONE
Method: GET
*/
Router.get("/", async (req, res) => {
    const getAllBooks = await BookModel.find();
    return res.json({ books: /*database.books*/ getAllBooks })
})

/*
Route: /b
Description: to get specific book
Access: public
Parameters: ISBN
Method: GET
*/
Router.get("/b/:isbn", async (req, res) => {
    // const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    const getSpecificBook = await BookModel.findOne({ ISBN: req.params.isbn });

    if (/*getSpecificBook.length === 0*/!getSpecificBook) {
        return res.json({ error: `Book not found of the ISBN : ${req.params.isbn}` })
    }

    return res.json({ books: getSpecificBook });
})

/*
Route: /c
Description: to get specific books based on category
Access: public
Parameters: category
Method: GET
*/

Router.get("/c/:category", async (req, res) => {
    // const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category));

    const getSpecificBooks = await BookModel.findOne({ category: req.params.category })

    if (!getSpecificBooks) {
        return res.json({ error: `Book not found of the category : ${req.params.category}` })
    }

    return res.json({ books: getSpecificBooks });
})

/*
Route: /a
Description: to get specific books
Access: public
Parameters: authors
Method: GET
*/

Router.get("/a/:author", async (req, res) => {
    // const getSpecificBooks = database.books.filter((book) => book.authors.includes(parseInt(req.params.author)));

    const getSpecificBooks = await BookModel.findOne({ authors: req.params.author })

    if (!getSpecificBooks) {
        res.json({ error: `Books not found for the author : ${req.params.author}` });
    }

    return res.json({ books: getSpecificBooks });
})

// ----------------------------------------------------------------------

/*
Route: /book/new
Description: to add a book data
Access: public
Parameters: NONE
Method: POST
*/
Router.post("/new", async (req, res) => {
    const newbook = req.body.newbook; /*const {newbook}=req.bodu*/

    // database.books.push(newbook);
    const addNewBook = await BookModel.create(newbook);

    return res.json({ books: addNewBook, message: "Book is added" });
})

// ---------------------------------------------------------------------

/*
Route: /book/update
Description: to update the book title
Access: public
Parameters: /:isbn
Method: PUT
*/
Router.put("/update/:isbn", async (req, res) => {
    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         book.title = req.body.bookTitle
    //         return;
    //     }
    // });

    const updateBook = await BookModel.findOneAndUpdate(
        {
            ISBN: req.params.isbn
        },
        {
            title: req.body.bookTitle
        },
        {
            new: true
        })

    return (res.json({ book: updateBook, message: "Book's title updated" }));
})

/*
Route: /book/author/update
Description: to update the author of the book aS well as the book of the author
Access: public
Parameters: /:isbn
Method: PUT
*/
Router.put("/author/update/:isbn", async (req, res) => {
    // Updating the book data

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         return (book.authors.push(req.body.newAuthor));
    //     }
    // });

    const updateBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    },
        {
            $addToSet: {
                authors: req.body.newAuthor
            }
        },
        {
            new: true
        })

    // Updating the author data

    // database.authors.forEach((author) => {
    //     if (author.id === req.body.newAuthor) {
    //         return (author.books.push(req.params.isbn));
    //     }
    // });

    const updateAuthor = await AuthrorModel.findOneAndUpdate({
        id: req.body.newAuthor
    },
        {
            $addToSet: {
                books: req.params.isbn
            }
        }, {
        new: true
    })

    return (res.json({ books: updateBook, authors: updateAuthor, message: "Updated the book authors" }));
})

// ----------------------------------------------------------------------
/*
Route: /book/delete
Description: to delete a book
Access: public
Parameters: /:isbn
Method: DLELTE
*/
Router.delete("/delete/:isbn", async (req, res) => {

    // const updateBookData = database.books.filter((book) => {
    //     return book.ISBN != req.params.isbn;
    // });

    // database.books = updateBookData;

    const deleteBook = await BookModel.findOneAndDelete({
        ISBN: req.params.isbn
    })

    return (res.json({ books: deleteBook, message: "Book deleted" }))
})

/*
Route: /book/author/delete
Description: to delete an author from the book and book from the author
Access: public
Parameters: /:isbn, :id
Method: DLELTE
*/
Router.delete("/author/delete/:isbn/:id", async (req, res) => {
    // Update the book database

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         const updateBookAuthor = book.authors.filter((author) => {
    //             return author != parseInt(req.params.id);
    //         });
    //         book.authors = updateBookAuthor;
    //         return;
    //     }
    // });

    const updateBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn
    }, {
        $pull: {
            authors: req.params.id
        }
    }, {
        new: true
    })

    // update the author database  

    // database.authors.forEach((author) => {
    //     if (author.id === parseInt(req.params.id)) {
    //         const updateAuthorBook = author.books.filter((book) => {
    //             return book != req.params.isbn;
    //         });
    //         author.books = updateAuthorBook;
    //         return;
    //     };
    // });

    const updateAuthor = await AuthorModel.findOneAndUpdate({
        id: req.params.id
    }, {
        $pull: {
            books: req.params.isbn
        }
    }, {
        new: true
    })

    return (res.json({ books: updateBook, authors: updateAuthor, message: "Deleted" }));

})


// Exporting
module.exports=Router;