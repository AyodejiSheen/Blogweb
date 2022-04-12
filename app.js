const express = require('express')
const morgan = require('morgan') // to handle middlewares
const mongoose = require('mongoose'); //to use mongoose
const { result } = require('lodash');
const port = process.env.PORT || 3000;


//importing the router
const blogRouters = require('./routes/blogRoutes');


//settung up the express app
const app = express();

//ADDING MONGO DB DATABASE CONNECTION
const dbURI = 'mongodb+srv://Portablog:Portablog290.@nodetuts.f15nz.mongodb.net/Node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
    .then ((result) => app.listen(port)) //log it to the console when connection to db is establised;;;  
                                        //TO listen for request only when the database is connected at port 3000
    .catch ((err) => console.log(err)) //log error to the console if not connected


//to register view engine (ejs)
app.set('view engine', 'ejs');

// also add the code  if ejs is not it view folder
// app.set('views', 'the name of the folder');



//listen for request at localhost port 3000
// app.listen(3000);



//MIDDLEWARE
//middleware code runs between the getting a request and sending a response to the browser
//use the next method to carry on the rest of the code after running the middleware function
// app.use((req, res, next) => {
//     console.log("This middleware is run")
//     next();
// })


// to also run my static files e.g css , images
app.use(express.static('public')); 
//create a folder name public and anything inside the public folder will made availabe at the frontent and pass public to express.static

//the middleware to convert data from the post request to readable format
app.use(express.urlencoded({extended: true}));

////USING MORGAN FOR MIDDLEWARE
app.use(morgan ('dev'));
//its morgan logging method and path to console





//getting a request from a url

app.get('/', (req, res) => {
    // res.send('<p>Hello world</p>');
    // res.sendFile('./views/index.html', { root: __dirname});    //__dirname is use to start looking from the main folder which is node
    //since its no longer index.html but index.ejs, you render .ejs
    // pass data to the ejs file, its pass as an object in curly brace.

    // const Blogs = [
    //     {title:"How to make Tea", snippet:"Just boil the water and pour the powder tea inside the water in a cup"},
    //     {title:"How to make pap", snippet:"Just boil the water and pour the pap  inside the water in a bowl"},
    //     {title:"How to make cornflakes", snippet:"Just boil the water and pour the cornflakes inside the water in a cup"},
    // ]

    //redirecting to blog
    res.redirect('/blog');

})







app.get('/about', (req, res) => {
    res.render('about', {title: 'About'});
})





// /blog routes
//we have access to our routes in the blogRouter using middleware
// the /blog is to make the router resuable and to remove /blog from all the routes so that we just write once here
app.use('/blog', blogRouters)










// //to perform a redirect
// app.get('/about-us', (req, res) => {
//     res.redirect('/about')
// })



//ADD ITEM TO THE MONGO DATABASE create an instance of the Blog model
// app.get('/real', (req, res) => {
//     const mat = new Blog({
//         title: "New blog",
//         snippet: "welcome to the new blog",
//         body : " The is the real new blog"
//     });

//     blog.save()   / TO save it to the database/
//         .then((result) => {
//             res.send(result)
//         })
//         .catch((err) => {
//             console.log(err)
//         })

// });






//404 page,, 
//**** it must be at the bottom of the code, because it fires everytime a request is made, but must only fire when there is no matching for the url. 
//****** USE in express is use to create or fire middleware functions
app.use((req, res) => {
    res.status(404).render('404', {title:"404"})
})
