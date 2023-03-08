//This file will be used to start the Node.js server

//Uses express as a Node.js framework to build the web application
const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");
//shortid generates a non-sequential short unique ids
const shortid = require("shortid");
require("./Models/Url");
const Url = mongoose.model("Url");
const utils = require("./HelperFunctions/util");
const app = express();
app.use(express.json());

//cors for cross-origin request to the front-end application
app.use(cors());


//Server setup - Set the server to use port number 5000
const PORT = 5000;
app.listen(5000,()=>{
    console.log("Server started at Port number 5000");
});

MongoDB_URL =  "mongodb+srv://Keen:M8XO0j609qXQBDUq@cluster0.kslkdoz.mongodb.net/?retryWrites=true&w=majority"

//Connect to database and creating endpoints
mongoose
    .connect(MongoDB_URL,{
        useNewUrlParser:true,
        useUnifiedTopology: true,
    }).then(()=>{
        console.log("Connected to database");
    }).catch((e)=>console.log(e));


//Get all saved URLs
app.get("/all",async(req,res) => {
    Url.find((error,data) => {
        if(error){
            console.log("Get succesful")
            return next(error);
        }else{
            console.log("Get unsuccesful");
            res.json(data);
        }
    });
})

//Post a URL shorterner endpoint - All URLs entered into the app will be sent to the endpoint where they will be validated using helper functions. 
//To create a new URL, we will concatenate the newly generated random id with our application's domain name
app.post("/short",async(req,res) => {
    console.log("Current URL: ", req.body.url);

    const {origUrl} = req.body;
    const base = `http://localhost:5000`;

    //generate a random urlID
    const urlId = shortid.generate();
    //Check if the URL is valid (if it follows the URL protocol)
    if(utils.validateUrl(origUrl)){
        try{
            //Find if this url is in our database
            let url = await Url.findOne({origUrl});
            if(url){
                res.json(url);
            }else{
                const shortUrl = `${base}/${urlId}`;

                url = new Url({
                    origUrl,
                    shortUrl,
                    urlId,
                    date: new Date(),
                });

                //save the new shorten url generated
                await url.save();
                res.json(url);
            }
        }catch(e){
            console.log(e);
            res.status(500).json('Server Error');
        }
    }else{
        //error - not a valid URL
        res.status(400).json('Invalid Original Url');
    }
});

//GET redirect: Can switch from the short URL stored in our database to the original URL. Monitor the number of clicks on the short URL
app.get("/:urlId",async(req,res) => {
    try{
        //Find the url
        const url = await Url.findOne({urlId: req.params.urlId});
        console.log(url);

        //If the url exist
        if(url){
            url.clicks++;
            url.save();
            return res.redirect(url.origUrl);
        }
        
        else{
            res.status(404).json("Not found");
        }
    }catch(e){
        console.log(e);
        res.status(500).json("Server Error");
    }
});