const mongoose = require("mongoose");

// Creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: String,
    title: String,
    authors: [Number],
    language: String,
    publishDate: String,
    numOfPages: Number,
    category: [String],
    publication: Number
});

// Creating the Model
const BookModel=mongoose.model(BookSchema);

module.exports=BookModel;