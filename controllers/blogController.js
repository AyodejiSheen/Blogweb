// creating the function for each of the routes here and not in the router itself

const res = require('express/lib/response');
const Blog = require('../models/blog');// blog that was exported from the model






//blog_index is the one getting all the post from the database when the request is made to the serve and rendering them to frontend to display
const blog_index = (req, res) => {
    
    //to get the blogs from the mongodb database
    Blog.find().sort({createdAt: -1}) //the Blog that was exported from the model..... sort ({createdAt: -1}) is to bring the latest blog to the top
    .then((result) => {
       // res.render('index', {title:'Home', Blogs:Blogs});
       res.render('index', {title:'Home',  Blogs:result});
   })
   .catch((err) => {
       console.log(err);
   })

};



// to create new blog when the form is submitted
const create_blog = (req, res) => {
    //const a new instance of the model to send to the database
// const blog = new Blog (req.body);
//OR
const enter = req.body;
const blog = new Blog({
    title : enter.title,
    snippet : enter.snippet,
    body: enter.body
})

blog.save()
    .then ((result) => {
        res.redirect('/blog')
    })
    .catch((err) => {
        console.log(err)
    })
};



//to render the create new blog page
const create_page = (req, res) => {
    res.render('create', {title:"Create a new blog"}); 
};




//to render a blog for viewing when its been clicked
const blog_details = (req, res) => {
    const id = req.params.id; // to capture and equate the id gotten from the link after clicked  (must be params."the variable name in the link")
    //to find the blog for that Id in the database
        Blog.findById(id)
            .then((result) => {
                res.render('details', {blog:result, title:"Blog details"})
            })
            .catch((err) => {
                console.log(err)
                res.status(404).render('404', {title:"404"}) // to render the 404 page instead so the app wont hang
            })
};



//to delete a blog
const delete_blog = (req, res) => {
    const id = req.params.id;

    Blog.findByIdAndDelete(id)
        .then((result) => {
            res.json({redirect:'/blog'})  //when a send a ajax request (i.e request send using javascript of frontend api, we send a JSON back as response), 
            //here we just want to redirect, buh we cant redirect from backend bcuz is from ajax. so we send a json with redirect property with the link we want to redirect to, to the frontend
            //then frontend do the redirect for us
        })

        .catch((err) => {
            console.log(err)
        })
}









module.exports= {
    //exporting each functions as object to have access to them
    blog_index,
    create_blog,
    create_page,
    blog_details,
    delete_blog
}