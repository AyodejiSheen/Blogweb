const http = require('http');
const fs = require('fs');
const _ = require('lodash')


//creating a server

const server = http.createServer((req, res) => {
    console.log('request made');

    //to generate random number using lodash between 0 - 20 (lodash is called with the _ then (.) the method you want to use)
    const num = _.random(0, 20)
    console.log(num);

    // to execute a function only once using lodash, pass the function inside the once method of lodash
    const greet = _.once(() => {
        console.log('hello');
    })

    greet(); //running the fucntion again will just make it run once


});



//to listen to a server
server.listen(3000, 'localhost', () => {
    console.log('listening to request')
})

