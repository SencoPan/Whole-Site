
let createError = require('http-errors');
let express = require('express');
let path = require('path');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser')
let logger = require('morgan');
let format = require('node.date-time');
let request = require("request");



let ObjectID = require('mongodb').ObjectID;

let db = require("./db");
const User = db.User;

let indexRouter = require('./routes/index');
let usersRouter = require('./routes/users');


let app = express();

let urlencodedParser = bodyParser.urlencoded({ extended : false });

let test;

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
app.post("/login", (req, res, next) =>{
    let username = req.body.login;
    let password = req.body.password;
    console.log('test', password, username);
    db.collection("users").findOne({ login : username, password: password }, (err, user) => {
        if(err){
            console.log(err);
        }
        if(!user){
            console.log(user);
            return res.sendStatus(404);
        }
        else{
            console.log('We are sure used this block!');
            res.redirect(307, "/logged");
        }
    });
});
app.all("/logged", (req, res)=>{
    res.render('logged');
})
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

        let dataRes = req.body;

        let newUser = new User();
        newUser.login = dataRes.login;
        newUser.email = dataRes.email;
        newUser.firstName = dataRes.firstName;
        newUser.secondName= dataRes.secondName;
        newUser.password = dataRes.password;

        newUser.save((err, savedUser) => {
            if(err) {
                console.log(err);
                res.sendStatus(500)
            }
        })


        return res.json({'success':true, 'msg': "true"});

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
