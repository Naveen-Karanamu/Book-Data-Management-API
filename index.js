// Imported the express framework
const express = require("express");
const { parse } = require("nodemon/lib/cli");

// Database
const database = require("./database/index");

// Initializing
const knk = express();

// Configurations
knk.use(express.json());

// Porting
knk.listen(3000, () => console.log("Server Running"));

/*
Route: /
Description: to get all books
Access: public
Parameters: NONE
Method: GET
*/
knk.get("/", (req, res) => {
    return res.json({ books: database.books })
})

/*
Route: /b
Description: to get specific book
Access: public
Parameters: ISBN
Method: GET
*/
knk.get("/b/:isbn", (req, res) => {
    const getSpecificBook = database.books.filter((book) => book.ISBN === req.params.isbn);

    if (getSpecificBook.length === 0) {
        return res.json({ error: `Book not found of the ISBN : ${req.params.isbn}` })
    }

    return res.json({ books: getSpecificBook });
})

/*
Route: /c
Description: to get specific books
Access: public
Parameters: category
Method: GET
*/

knk.get("/c/:category", (req, res) => {
    const getSpecificBooks = database.books.filter((book) => book.category.includes(req.params.category));

    if (getSpecificBooks.length === 0) {
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

knk.get("/a/:author", (req, res) => {
    const getSpecificBooks = database.books.filter((book) => book.authors.includes(parseInt(req.params.author)));

    if (getSpecificBooks.length === 0) {
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
knk.get("/auth", (req, res) => {
    return res.json({ authors: database.authors });
})

/*
Route: /auth
Description: to get specific author
Access: public
Parameters: /:id
Method: GET
*/
knk.get("/auth/:id", (req, res) => {
    const getSpecificAuthor = database.authors.filter((author) => author.id === parseInt(req.params.id))

    if (getSpecificAuthor.length === 0) {
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
knk.get("/auth/b/:isbn", (req, res) => {
    const getAuthors = database.authors.filter((author) => author.books.includes(req.params.isbn));

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
knk.get("/pub", (req, res) => {
    return (res.json({ publications: database.publications }));
})

/*
Route: /pub
Description: to get a specific publiction
Access: public
Parameters: /:id
Method: GET
*/
knk.get("/pub/:id", (req, res) => {
    const getSpecificPublication = database.publications.filter((publication) => publication.id === parseInt(req.params.id));

    if (getSpecificPublication.length === 0) {
        return (res.json({ error: `Publications not found of the id : ${req.params.id}` }))
    }

    return (res.json({ publication: getSpecificPublication }));
})

/*
Route: /pub
Description: to get a specific publiction
Access: public
Parameters: /:isbn
Method: GET
*/
knk.get("/pub/b/:isbn", (req, res) => {
    const getPublications = database.publications.filter((publication) => publication.books.includes(req.params.isbn))

    if (getPublications.length === 0) {
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
knk.post("/book/new", (req, res) => {
    const newbook = req.body.newbook;

    database.books.push(newbook);

    return res.json({ books: database.books, message: "Book is added" });
})

/*
Route: /author/new
Description: to add a author data
Access: public
Parameters: NONE
Method: POST
*/
knk.post("/author/new", (req, res) => {
    const newAuthor = req.body.newAuthor;

    database.authors.push(newAuthor);

    return (res.json({ authors: database.authors, message: "Author added" }));
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

    database.publications.push(newPublication);

    return (res.json({ publication: database.publications, message: "New publication added" }));
})

//---------------------------------------------------------------------- 

/*
Route: /book/update
Description: to update the book title
Access: public
Parameters: /:isbn
Method: PUT
*/
knk.put("/book/update/:isbn", (req, res) => {
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            book.title = req.body.bookTitle
            return;
        }
    });

    return (res.json({ book: database.books, message: "Book's title updated" }));
})

/*
Route: /book/author/update
Description: to update the author of the book aS well as the book of the author
Access: public
Parameters: /:isbn
Method: PUT
*/
knk.put("/book/author/update/:isbn", (req, res) => {
    // Updating the book data
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            return (book.authors.push(req.body.newAuthor));
        }
    });

    // Updating the author data
    database.authors.forEach((author) => {
        if (author.id === req.body.newAuthor) {
            return (author.books.push(req.params.isbn));
        }
    });

    return (res.json({ books: database.books, authors: database.authors, message: "Updated the book authors" }));
})

/*
Route: /author/update
Description: to update the author name
Access: public
Parameters: /:id
Method: PUT
*/
knk.put("/author/update/:id", (req, res) => {
    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.id)) {
            author.name = req.body.newAuthorName;
            return;
        }
    });
    return (res.json({ authors: database.authors, message: "Author name updated" }));
})

/*
Route: /pub/update
Description: to update the publication name
Access: public
Parameters: /:id
Method: PUT
*/
knk.put("/pub/update/:id", (req, res) => {
    database.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.id)) {
            publication.name = req.body.newPublicationName;
            return;
        }
    });
    return (res.json({ publications: database.publications, message: "publication name updated" }));
})

/*
Route: /pub/update
Description: to update the publication name
Access: public
Parameters: /:id
Method: PUT
*/
knk.put("/pub/book/update/:id", (req, res) => {
    // updating the publications data
    database.publications.forEach((publication) => {
        if (publication.id === parseInt(req.params.id)) {
            return publication.books.push(req.body.newPubBook);
        }
    });

    // updating the book data
    database.books.forEach((book) => {
        if (book.ISBN === req.body.newPubBook) {
            book.publication = req.params.id;
            return;
        }
    });

    return (res.json({ publications: database.publications, books: database.books, message: "Publications book data updated" }));
})

//----------------------------------------------------------------------

/*
Route: /book/delete
Description: to delete a book
Access: public
Parameters: /:isbn
Method: DLELTE
*/
knk.delete("/book/delete/:isbn", (req, res) => {
    const updateBookData = database.books.filter((book) => {
        return book.ISBN != req.params.isbn;
    });

    database.books = updateBookData;

    return (res.json({ books: database.books, message: "Book deleted" }))
})

/*
Route: /book/author/delete
Description: to delete an author from the book and book from the author
Access: public
Parameters: /:isbn, :id
Method: DLELTE
*/
knk.delete("/book/author/delete/:isbn/:id", (req, res) => {
    // Update the book database
    database.books.forEach((book) => {
        if (book.ISBN === req.params.isbn) {
            const updateBookAuthor = book.authors.filter((author) => {
                return author != parseInt(req.params.id);
            });
            book.authors = updateBookAuthor;
            return;
        }
    });

    // update the author database
    database.authors.forEach((author) => {
        if (author.id === parseInt(req.params.id)) {
            const updateAuthorBook = author.books.filter((book) => {
                return book != req.params.isbn;
            });
            author.books = updateAuthorBook;
            return;
        };
    });

    return (res.json({ books: database.books, authors: database.authors, message: "Deleted" }));

})

/*
Route: /author/delete
Description: to delete an author
Access: public
Parameters: /:id
Method: DLELTE
*/
knk.delete("/author/delete/:id", (req, res) => {
    const updateAuthorData = database.authors.filter((author) => {
        return author.id != req.params.id;
    });

    database.authors = updateAuthorData;

    return (res.json({ books: database.authors, message: "Author deleted" }))
})

/*
Route: /pub/delete
Description: to delete a publication
Access: public
Parameters: /:id
Method: DLELTE
*/
knk.delete("/pub/delete/:id", (req, res) => {
    const updatePublication = database.publications.filter((pub) => {
        return pub.id !== parseInt(req.params.id);
    })
    database.publications = updatePublication;

    return (res.json({ publications: database.publications, message: "Publication deleted" }));
})

/*
Route: /pub/book/delete
Description: to delete a publication
Access: public
Parameters: /:id ,/:isbn
Method: DLELTE
*/
knk.delete("/pub/book/delete/:id/:isbn", (req, res) => {
    // update the publication database
    database.publications.forEach((pub) => {
        if (pub.id === parseInt(req.params.id)) {
            const updatedPubBook = pub.books.filter((book) => {
                book != req.params.isbn;
                return;
            })
            pub.books = updatedPubBook;
            return;
        }

    });

    // update the book database
   database.books.forEach((book)=>{
       if(book.ISBN===req.params.isbn){
           return book.publication=0;
       }
   })


return (res.json({ publications: database.publications, books: database.books, message: "Books deleted from the publications" }));
})