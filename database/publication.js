const mongoose = require("mongoose");

// Creating the Schema
const PublicationSchema = mongoose.Schema({
    id: {
        type:Number,
        require:true
    },
    name:{
        type:String,
        require:true
    },
    books: [String]
});

// Creating the Model
const PublicationModel=mongoose.model("Publications", PublicationSchema);

module.exports=PublicationModel;