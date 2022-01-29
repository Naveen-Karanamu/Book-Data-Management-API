// Importing Router
const Router=require("express").Router();

// Imporitng model
const PublicationModel=require("../../database/publication");


/*
Route: /pub
Description: to get all the publications
Access: public
Parameters: NONE
Method: GET
*/
Router.get("/pub", async (req, res) => {
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
Router.get("/pub/:id", async (req, res) => {
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
Router.get("/pub/b/:isbn", async (req, res) => {
    // const getPublications = database.publications.filter((publication) => publication.books.includes(req.params.isbn))

    const getPublications = await PublicationModel.findOne({ books: req.params.isbn })

    if (!getPublications) {
        return (res.json({ error: `Publications not found for the book of ISBN : ${req.params.isbn}` }))
    }

    return (res.json({ publications: getPublications }));
})

//---------------------------------------------------------------------- 



/*
Route: /pub/new
Description: to add a publication data
Access: public
Parameters: NONE
Method: POST
*/
Router.post("/pub/new",async (req, res) => {
    try{
        const newPublication = req.body.newPublication;

    // database.publications.push(newPublication);
    const addNewPub =await PublicationModel.create(newPublication);

    return (res.json({ publication: addNewPub, message: "New publication added" }));
    }catch(error){
        return(res.json({error:error.message}))
    }
})

//---------------------------------------------------------------------- 




/*
Route: /pub/update
Description: to update the publication name
Access: public
Parameters: /:id
Method: PUT
*/
Router.put("/pub/update/:id", async (req, res) => {
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
Router.put("/pub/book/update/:id", async (req, res) => {
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
Route: /pub/delete
Description: to delete a publication
Access: public
Parameters: /:id
Method: DLELTE
*/
Router.delete("/pub/delete/:id", async (req, res) => {

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
Router.delete("/pub/book/delete/:id/:isbn",async(req, res) => {
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


// Exporting
module.exports=Router;