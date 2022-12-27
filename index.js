const express = require('express')
const homeRoute = require('./routes/home');
const bodyParser= require('body-parser')
const app = express();
const port = 8080;
const mongoose = require('mongoose');
const url = "mongodb://127.0.0.1:27017/fcDb"
const dbName ="employeeDb"

mongoose.connect(url, (err,client)=>{
    if(err) throw err
    console.log("Connection Successfull!");
// client.on(err, console.log("Connection Successfull!"));

})


//MIDDLEWARE SETUP

//VIEWENGINE SETUP
app.set('view engine','ejs');

//STATIC FOLDER SETUP
app.use(express.static('public'))
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//ROUTING
app.use('/',homeRoute)

app.listen(port, ()=>
{
    console.log(`Listening on port ${port}`);
})