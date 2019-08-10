
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser')
var logger = require('morgan');
const format = require('node.date-time');
let request = require("request");



var ObjectID = require('mongodb').ObjectID;

var db = require("./db");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


var app = express();

var urlencodedParser = bodyParser.urlencoded({ extended : false });

var test;

db.connect("mongodb://localhost:27017/nodeExp",(err, state) =>{

  if(err){
    return console.log(err);
  }

  db = state;

});



// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json())


app.get('/test', (req, res) => {
  res.sendFile(__dirname + "/htmlTest.html")
});

app.post('/reg', (req, res)=>{
    if(
        req.body.captcha === undefined ||
        req.body.captcha === ''        ||
        req.body.captcha === null
    ){
        return res.json({ "success": false, "msg": "Please select captcha" })
    }

    //secret Key
    const secretKey = '6LeKZrIUAAAAAFj3rdySMCcoUcHZU0z85dUWZaXV';

    //vefiry URL
    const vrfUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddres}`;

    //request
    request(vrfUrl, (err, response, body) => {
        body = JSON.parse(body);

        // if not successful
        if (body.success !== undefined && !body.success) {
            return res.json({ "success": false, "msg": "Failed captcha vefication." })
        }

        // If successful
        return res.json({ "success": true, "msg": "Captcha passed" })
    })
})


app.get("/check", (req, res) => {
  res.render("mainPost");
})



app.get("/", (req, res) =>{
  db.collection('artists').find().toArray((err, docs) => {
    if(err) {
      console.log(err);
      return res.sendStatus(500);
    }
    console.log(docs);
    res.render("mainLayout", {name: docs[0].name , content: docs[0].content});
  })
});

/*app.post('/', urlencodedParser, (req, res) => {
  if(!req.body) return res.sendStatus(400);
  console.log(req.body);
  res.render('mainLayout', {data: req.body});
});*/

app.post("/", urlencodedParser, (req, res) =>{
  var artist = {
    name: req.body.Title,
    content: req.body.content
  }
  console.log(artist);
  db.collection("artists").insertMany([artist], (err, result) => {
    if(err) {
      console.log(err)
      res.sendStatus(500);
    }
  });
  res.render("mainPost");
});

app.get("/reg", (req, res) =>{
  const func = () => db.collection('artists').insertMany(["hello", "world"], (err, result) => {
    if(err) {
      console.log(err)
      res.sendStatus(500);
    }
  });
  res.render('registration', { func1 : func });
})
app.get("/test/:id", (req, res)=>{
  db.collection('artists').updateOne(
      { _id: ObjectID(req.params.id) },
      { $set : { name: "the name of the lord" } },
      (err, result) => {
        if(err) {
          console.log(err);
          return res.sendStatus(500)
        };
        db.collection('artists').findOne({_id: ObjectID(req.params.id)}, (err, docs) => {
          if (err) {console.log(err);
            return res.sendStatus(500);
          }
          console.log(docs);
          res.render("index", {testText: docs.name + ' ' + docs.content})
        })})

  /*db.collection('artists').findOne({_id: ObjectID(req.params.id)}, (err, docs) => {
    if (err) {console.log(err);
    return res.sendStatus(500);
  }
    console.log(docs);
    res.render("index", {testText: docs.name + ' ' + docs.content})
  })*/

})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

db.getAllData();
