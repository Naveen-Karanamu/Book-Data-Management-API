// Imported the express framework
const express =require("express");

// Database
const database=require("./database/index+");

// Initializing
const knk =express();

// Configurations
knk.use(express.json());

knk.listen(3000,()=>console.log("Server Running"));
