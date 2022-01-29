const mongoose=require("mongoose");

// Creating the schema
const AuthorSchema=mongoose.Schema({
    id: {
        type:Number,
        required:true,
        minLength:1
    },
    name: {
        type:String,
        required:true,
        minLength:3
    },
    books: [String]
});

// Creating the Model
const AuthrorModel=mongoose.model("Authors", AuthorSchema);

module.exports=AuthrorModel;