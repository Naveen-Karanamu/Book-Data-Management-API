const mongoose = require("mongoose");

// Creating the Schema
const PublicationSchema = mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
});

// Creating the Model
const PublicationModel=mongoose.model(PublicationSchema);

module.exports=PublicationModel;