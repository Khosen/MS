const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors= require("cors");
const passport = require("passport");
const mongoose = require("mongoose");
const config = require("./config/database");

//connect to db
//mongoose.connect(config.database);
/*mongoClient.connect(mongoose);

//set connection
mongoose.connection.on('connected', () =>{
    console.log("connected to" + config.database);
});*/
mongoose.connect(config.database, { useNewUrlParser: true });
let db = mongoose.connection;

//check connections
db.once('open', ()=>{
 console.log('Connected to Mongodb');
});
//check for db errors
db.on('error', (err) =>{
  console.log(err);});

//use express
const app= express();


const users = require('./routes/users');
//assign port
const port = 3000;


//set up cors middleware
app.use(cors());

//set up body-parser middleware
app.use(bodyParser.json());

//set up passport middleware
app.use(passport.initialize());
app.use(passport.session());

 require('./config/passport')(passport);


app.use('/users', users);

//set static folder
app.use(express.static(path.join(__dirname, 'client')));


app.get('/', (req, res) =>{
    res.send("invalid endpoint");
});
/*pp.post('/', (req, res) =>{
    res.send("invalid endpoint");
});*/

 app.listen(port, () => {
     console.log("server started at:" +port);
 });