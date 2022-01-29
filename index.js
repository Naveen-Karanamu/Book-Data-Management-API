// requiring env
require("dotenv").config();

// Imported the express framework
const express = require("express");
const { parse } = require("nodemon/lib/cli");
const mongoose = require("mongoose");

// Database
const database = require("./database/index");

// Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
const AuthrorModel = require("./database/author");

// Initializing
const knk = express();

// Configurations
knk.use(express.json());

// establishing database connection
mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Connection established"));


// Porting
knk.listen(3000, () => console.log("Server Running"));

/*
Route: /
Description: to get all books
Access: public
Parameters: NONE
Method: GET
*/
knk.get("/", async (req, res) => {
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
knk.get("/b/:isbn", async (req, res) => {
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

knk.get("/c/:category", async (req, res) => {
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

knk.get("/a/:author", async (req, res) => {
    // const getSpecificBooks = database.books.filter((book) => book.authors.includes(parseInt(req.params.author)));

    const getSpecificBooks = await BookModel.findOne({ authors: req.params.author })

    if (!getSpecificBooks) {
        res.json({ error: `Books not found for the author : ${req.params.author}` });
    }

    return res.json({ books: getSpecificBooks });
})

/*
Route: /auth
Description: to get all authors
Access: public
Parameters: NONE
Method: GET
*/
knk.get("/auth", async (req, res) => {
    const getAllAuthors = await AuthrorModel.find()
    return res.json({ authors: getAllAuthors });
})

/*
Route: /auth
Description: to get specific author
Access: public
Parameters: /:id
Method: GET
*/
knk.get("/auth/:id", async (req, res) => {
    // const getSpecificAuthor = database.authors.filter((author) => author.id === parseInt(req.params.id))

    const getSpecificAuthor = await AuthrorModel.findOne({ id: req.params.id })

    if (!getSpecificAuthor) {
        return res.json({ error: `Author not found of the id : ${req.params.id}` })
    }

    return res.json({ author: getSpecificAuthor });
})

/*
Route: /auth/b
Description: to get all the authors of the specific book
Access: public
Parameters: /:isbn
Method: GET
*/
knk.get("/auth/b/:isbn", async (req, res) => {
    // const getAuthors = database.authors.filter((author) => author.books.includes(req.params.isbn));

    const getAuthors = await AuthrorModel.findOne({ books: req.params.isbn })

    if (getAuthors.length === 0) {
        res.json({ error: `Author not found for the book with ISBN : ${req.params.isbn}` })
    }

    return res.json({ authors: getAuthors });
})

/*
Route: /pub
Description: to get all the publications
Access: public
Parameters: NONE
Method: GET
*/
knk.get("/pub", async (req, res) => {
    const getAllPublications = await PublicationModel.find();
    return (res.json({ publications: getAllPublications }));
})

/*
Route: /pub
Description: to get a specific publiction
Access: public
Parameters: /:id
Method: GET
*/
knk.get("/pub/:id", async (req, res) => {
    // const getSpecificPublication = database.publications.filter((publication) => publication.id === parseInt(req.params.id));

    const getSpecificPublication = await PublicationModel.findOne({ id: req.params.id })

    if (!getSpecificPublication) {
        return (res.json({ error: `Publications not found of the id : ${req.params.id}` }))
    }

    return (res.json({ publication: getSpecificPublication }));
})

/*
Route: /pub
Description: to get a specific publiction based on book
Access: public
Parameters: /:isbn
Method: GET
*/
knk.get("/pub/b/:isbn", async (req, res) => {
    // const getPublications = database.publications.filter((publication) => publication.books.includes(req.params.isbn))

    const getPublications = await PublicationModel.findOne({ books: req.params.isbn })

    if (!getPublications) {
        return (res.json({ error: `Publications not found for the book of ISBN : ${req.params.isbn}` }))
    }

    return (res.json({ publications: getPublications }));
})

//---------------------------------------------------------------------- 

/*
Route: /book/new
Description: to add a book data
Access: public
Parameters: NONE
Method: POST
*/
knk.post("/book/new", async (req, res) => {
    const newbook = req.body.newbook; /*const {newbook}=req.bodu*/

    // database.books.push(newbook);
    const addNewBook = await BookModel.create(newbook);

    return res.json({ books: addNewBook, message: "Book is added" });
})

/*
Route: /author/new
Description: to add a author data
Access: public
Parameters: NONE
Method: POST
*/
knk.post("/author/new", async (req, res) => {
    const newAuthor = req.body.newAuthor;

    // database.authors.push(newAuthor);
    const addNewAuthor = await AuthrorModel.create(newAuthor);

    return (res.json({ authors: addNewAuthor, message: "Author added" }));
})

/*
Route: /pub/new
Description: to add a publication data
Access: public
Parameters: NONE
Method: POST
*/
knk.post("/pub/new", (req, res) => {
    const newPublication = req.body.newPublication;

    // database.publications.push(newPublication);
    const addNewPub = PublicationModel.create(newPublication);

    return (res.json({ publication: addNewPub, message: "New publication added" }));
})

//---------------------------------------------------------------------- 

/*
Route: /book/update
Description: to update the book title
Access: public
Parameters: /:isbn
Method: PUT
*/
knk.put("/book/update/:isbn", async (req, res) => {
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
knk.put("/book/author/update/:isbn", async (req, res) => {
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

/*
Route: /author/update
Description: to update the author name
Access: public
Parameters: /:id
Method: PUT
*/
knk.put("/author/update/:id", async (req, res) => {
    // database.authors.forEach((author) => {
    //     if (author.id === parseInt(req.params.id)) {
    //         author.name = req.body.newAuthorName;
    //         return;
    //     }
    // });

    const updateAuth = await AuthorModel.findOneAndUpdate({
        id: req.params.id
    }, {
        name: req.body.newAuthorName
    }, {
        new: true
    })

    return (res.json({ authors: updateAuth, message: "Author name updated" }));
})

/*
Route: /pub/update
Description: to update the publication name
Access: public
Parameters: /:id
Method: PUT
*/
knk.put("/pub/update/:id", async (req, res) => {
    // database.publications.forEach((publication) => {
    //     if (publication.id === parseInt(req.params.id)) {
    //         publication.name = req.body.newPublicationName;
    //         return;
    //     }
    // });

    const updatePub = await PublicationModel.findOneAndUpdate({
        id: req.params.id
    }, {
        name: req.body.newPublicationName
    }, {
        new: true
    })

    return (res.json({ publications: updatePub, message: "publication name updated" }));
})

/*
Route: /pub/book/update
Description: to update the publication book 
Access: public
Parameters: /:id
Method: PUT
*/
knk.put("/pub/book/update/:id", async (req, res) => {
    // updating the publications data

    // database.publications.forEach((publication) => {
    //     if (publication.id === parseInt(req.params.id)) {
    //         return publication.books.push(req.body.newPubBook);
    //     }
    // });

    const updatePubBook = await PublicationModel.findOneAndUpdate({
        id: req.params.id
    }, {
        $addToSet: {
            books: req.body.newPubBook
        }
    }, {
        new: true
    })

    // updating the book data

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.body.newPubBook) {
    //         book.publication = req.params.id;
    //         return;
    //     }
    // });

    const updateBookPub = await BookModel.findOneAndUpdate({
        ISBN: req.body.newPubBook
    }, {
        publication: req.params.id
    }, {
        new: true
    })

    return (res.json({ publications: updatePubBook, books: updateBookPub, message: "Publications book data updated" }));
})

//----------------------------------------------------------------------

/*
Route: /book/delete
Description: to delete a book
Access: public
Parameters: /:isbn
Method: DLELTE
*/
knk.delete("/book/delete/:isbn", async (req, res) => {

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
knk.delete("/book/author/delete/:isbn/:id", async (req, res) => {
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

/*
Route: /author/delete
Description: to delete an author
Access: public
Parameters: /:id
Method: DLELTE
*/
knk.delete("/author/delete/:id", async (req, res) => {

    // const updateAuthorData = database.authors.filter((author) => {
    //     return author.id != req.params.id;
    // });

    // database.authors = updateAuthorData;

    const updateAuthor = await AuthorModel.findOneAndDelete({
        id: req.params.id
    })

    return (res.json({ books: updateAuthor, message: "Author deleted" }))
})

/*
Route: /pub/delete
Description: to delete a publication
Access: public
Parameters: /:id
Method: DLELTE
*/
knk.delete("/pub/delete/:id", async (req, res) => {

    // const updatePublication = database.publications.filter((pub) => {
    //     return pub.id !== parseInt(req.params.id);
    // })
    // database.publications = updatePublication;

    const updatePub = await PublicationModel.findOneAndDelete({
        id: req.params.id
    })

    return (res.json({ publications: updatePub, message: "Publication deleted" }));
})

/*
Route: /pub/book/delete
Description: to delete a publication
Access: public
Parameters: /:id ,/:isbn
Method: DLELTE
*/
knk.delete("/pub/book/delete/:id/:isbn",async(req, res) => {
    // update the publication database

    // database.publications.forEach((pub) => {
    //     if (pub.id === parseInt(req.params.id)) {
    //         const updatedPubBook = pub.books.filter((book) => {
    //             book != req.params.isbn;
    //             return;
    //         })
    //         pub.books = updatedPubBook;
    //         return;
    //     }
    // });

    const updatePubBook = await PublicationModel.findOneAndUpdate({
        id: req.params.id
    }, {
        $pull: {
            books: req.params.isbn
        }
    }, {
        new: true
    })

    // update the book database

    // database.books.forEach((book) => {
    //     if (book.ISBN === req.params.isbn) {
    //         return book.publication = 0;
    //     }
    // })

    const updateBookPub=await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn
    },{
        publication:0
    },{
        new:true
    })


    return (res.json({ publications:updatePubBook, books: updateBookPub, message: "Books deleted from the publications" }));
})