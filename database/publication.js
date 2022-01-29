const mongoose = require("mongoose");

// Creating the Schema
const PublicationSchema = mongoose.Schema({
    id: {
        type:Number,
        required:true,
        minLength:1
    },
    name:{
        type:String,
        required:true,
        minLength:3
    },
    books: [String]
});

// Creating the Model
const PublicationModel=mongoose.model("Publications", PublicationSchema);

module.exports=PublicationModel;