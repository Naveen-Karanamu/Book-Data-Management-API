const mongoose = require("mongoose");

// Creating the Schema
const PublicationSchema = mongoose.Schema({
    id: {
        type:Number,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    books: [String]
});

// Creating the Model
const PublicationModel=mongoose.model("Publications", PublicationSchema);

module.exports=PublicationModel;