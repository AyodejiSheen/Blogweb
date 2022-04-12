const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// creating a schema for the blog. like defining the property and property type
//schema defines the structure of our documents

const blogSchema = new Schema({
    title : {
        type: String,
        required: true,
    },

    snippet: {
        type: String,
        required: true,
    },

    body: {
        type : String,
        required: true
    }
}, {timestamps: true}) // to automatically add timestamps 


//creating blog MODEL
//model provides of means by which we communicate to the database collection for the document
//must start with capital letter and Blog === Blog as below

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;   //to export out the Blog collection 


//*****
//make the schema
//define the structure
//define the model based on the schema