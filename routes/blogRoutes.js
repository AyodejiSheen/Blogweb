//to set up the express router


const express = require('express');
const router = express.Router(); // to create a new instance on the router object in express
const blogController = require('../controllers/blogController')



// still the same as router.get('/blog/....) which is same as router.get('/'...) or router.get
router.get('/', blogController.blog_index);   // this is going to handle the request sent to '/' and the fire the function in blogController.blog_index


//MAKING A POST REQUEST to submite new blogs to the database from form
router.post('/', blogController.create_blog);



// it must be at the top so it wont think create is just an id and be searching for it
router.get('/create', blogController.create_page); // to render the create page


//to output a single blog clicked using is id passed to the route
//the : is use to denote that id is a variable not just a normal route, id could be anything
router.get('/:id', blogController.blog_details);




//to handle the delete request send from the frontend in the backend
router.delete('/:id', blogController.delete_blog);

//to export out the router
module.exports = router;