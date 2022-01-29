// Importing Router
const Router=require("express").Router();

// Importin the Model
const AuthorModel=require("../../database/author");

/*
Route: /auth
Description: to get all authors
Access: public
Parameters: NONE
Method: GET
*/
Router.get("/auth", async (req, res) => {
    const getAllAuthors = await AuthorModel.find()
    return res.json({ authors: getAllAuthors });
})

/*
Route: /auth
Description: to get specific author
Access: public
Parameters: /:id
Method: GET
*/
Router.get("/auth/:id", async (req, res) => {
    // const getSpecificAuthor = database.authors.filter((author) => author.id === parseInt(req.params.id))

    const getSpecificAuthor = await AuthorModel.findOne({ id: req.params.id })

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
Router.get("/auth/b/:isbn", async (req, res) => {
    // const getAuthors = database.authors.filter((author) => author.books.includes(req.params.isbn));

    const getAuthors = await AuthorModel.findOne({ books: req.params.isbn })

    if (getAuthors.length === 0) {
        res.json({ error: `Author not found for the book with ISBN : ${req.params.isbn}` })
    }

    return res.json({ authors: getAuthors });
})

// -------------------------------------------------------

/*
Route: /author/new
Description: to add a author data
Access: public
Parameters: NONE
Method: POST
*/
Router.post("/new", async (req, res) => {
    const newAuthor = req.body.newAuthor;

    // database.authors.push(newAuthor);
    const addNewAuthor = await AuthorModel.create(newAuthor);

    return (res.json({ authors: addNewAuthor, message: "Author added" }));
})

// -------------------------------------------------------

/*
Route: /author/update
Description: to update the author name
Access: public
Parameters: /:id
Method: PUT
*/
Router.put("/update/:id", async (req, res) => {
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

// -------------------------------------------------------

/*
Route: /author/delete
Description: to delete an author
Access: public
Parameters: /:id
Method: DLELTE
*/
Router.delete("/delete/:id", async (req, res) => {

    // const updateAuthorData = database.authors.filter((author) => {
    //     return author.id != req.params.id;
    // });

    // database.authors = updateAuthorData;

    const updateAuthor = await AuthorModel.findOneAndDelete({
        id: req.params.id
    })

    return (res.json({ books: updateAuthor, message: "Author deleted" }))
})

module.exports=Router;