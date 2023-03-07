//This file will be used to start the Node.js server

//Uses express as a Node.js framework to build the web application
const express = require('express');
const app = express();

//Server setup - Set the server to use port number 5000
const PORT = 5000;
app.listen(5000,()=>{
    console.log("Server started at Port number 5000");
});

//Setting up MongoDB for database
