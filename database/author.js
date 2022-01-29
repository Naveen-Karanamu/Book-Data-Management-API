const mongoose=require("mongoose");

// Creating the schema
const AuthorSchema=mongoose.Schema({
    id: {
        type:Number,
        require:true
    },
    name: {
        type:String,
        require:true
    },
    books: [String]
});

// Creating the Model
const AuthrorModel=mongoose.model("Authors", AuthorSchema);

module.exports=AuthrorModel;