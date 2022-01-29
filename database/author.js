const mongoose=require("mongoose");

// Creating the schema
const AuthorSchema=mongoose.Schema({
    id: {
        type:Number,
        required:true
    },
    name: {
        type:String,
        required:true
    },
    books: [String]
});

// Creating the Model
const AuthrorModel=mongoose.model("Authors", AuthorSchema);

module.exports=AuthrorModel;