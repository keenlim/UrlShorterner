//Creating the mongoDB schema for data collection

//Import Mongoose
const mongoose = require("mongoose");

const UrlSchema = new mongoose.Schema({
    urlId: {
        type: String,
        required: true,
    },
    originalUrl: {
        type:String,
        required:true,
    },
    shortUrl:{
        type:String,
        required:true,
    },
    clicks:{
        type: Number,
        required: true,
        default: 0,
    },
    date:{
        type: String,
        default: Date.now,
    }

});

//Export module to use the mongoose model by providing interface to the database
mongoose.model("Url",UrlSchema);