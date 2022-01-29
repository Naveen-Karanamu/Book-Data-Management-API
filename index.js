// requiring env
require("dotenv").config();

// Imported the express framework
const express = require("express");
const mongoose = require("mongoose");

// Initializing Microservices Routes
const Books=require("./API/Book");
const Authors=require("./API/Author");
const Publications=require("./API/Publication");

// Initializing
const knk = express();

// Configurations
knk.use(express.json());

// establishing database connection
mongoose.connect(process.env.MONGODB_URL).then(() => console.log("Connection established"));

// Initializing Microservices
knk.use("/book",Books);
knk.use("/author",Authors);
knk.use("/publication",Publications);

// Porting
knk.listen(3000, () => console.log("Server Running"));


