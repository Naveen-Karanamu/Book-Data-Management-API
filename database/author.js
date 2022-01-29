const mongoose=require("mongoose");

// Creating the schema
const AuthorSchema=mongoose.Schema({
    id: Number,
    name: String,
    books: [String]
});

// Creating the Model
const AuthrorModel=mongoose.model(AuthorSchema);

module.exports=AuthrorModel;