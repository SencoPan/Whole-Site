const   createError = require('http-errors'),
        express = require('express'),
        path = require('path'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser')
        logger = require('morgan'),
        request = require("request"),
        authRouters = require("./routes/login.js")
        sassMiddleware = require('node-sass-middleware');
//const multer = require('multer');
//const format = require('node.date-time');

//const session = require("express-session");

let ObjectID = require('mongodb').ObjectID;

let db = require("./db");
const User = db.User;

//let indexRouter = require('./routes/index');
//let usersRouter = require('./routes/users');


let app = express();

let urlencodedParser = bodyParser.urlencoded({ extended : false });

//const ONE_HOUR = 1000 * 60 * 60;
//const SESS_LIFETIME = ONE_HOUR;

db.connect("mongodb://localhost:27017/nodeExp",(err, state) =>{
  if(err){
    return console.log(err);
  }
  db = state;
});



// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(sassMiddleware({
    src: path.join(__dirname, '/public/sass'),
    dest: path.join(__dirname, '/public/stylesheets'),
    debug: true,
    indentedSyntax: true,
    outputStyle: 'compressed',
    prefix: '/stylesheets'
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/auth', authRouters)

app.use(bodyParser.json())

/*app.use(session({
    secret: true,
    name: "King",
    proxy: true,
    resave: true,
    saveUninitialized: true
}));*/

app.post("/login", (req, res) =>{

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
            res.redirect(307, "/");
        }
    });
});

app.post('/reg', (req, res)=>{
    if(
        req.body.captcha === undefined ||
        req.body.captcha === ''        ||
        req.body.captcha === null
    ){
        return false;
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
            return false;
        }

        // If successful

        let dataRes = req.body;

        let newUser = new User();
        newUser.login = dataRes.login;
        newUser.email = dataRes.email;
        newUser.firstName = dataRes.firstName;
        newUser.secondName= dataRes.secondName;
        newUser.password = dataRes.password;

        newUser.save((err) => {
            if(err) {
                console.log(err);
                res.sendStatus(500)
            }
        })

        return res.json({ "success": true, "msg": "ture" })
    })
})

app.get('/reg', (req, res) => {
    res.render("registration");
});

app.get("/", (req, res) => {
  res.render("mainPost");
});

app.get("/check", (req, res) => {
        res.render("mainLayout")
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + "/htmlTest.html")
});

app.post("/", urlencodedParser, (req, res) =>{

  const artist = {
    name: req.body.Title,
    content: req.body.content
  }

  console.log(artist);

  db.collection("artists").insertMany( [artist], ( err, result ) => {
    if(err) {
      console.log(err)
      res.sendStatus(500);
    }
  });
  res.render("mainPost");
});


app.get("/test/:id", (req, res)=>{
  db.collection('artists').updateOne(
      { _id: ObjectID(req.params.id) },
      { $set : { name: "the name of the lord" } },
      (err) => {
        if(err) {
          console.log(err);
          return res.sendStatus(500)
        }
        db.collection('artists').findOne({_id: ObjectID(req.params.id)}, (err, docs) => {
          if (err) {console.log(err);
            return res.sendStatus(500);
          }
          console.log(docs);
          res.render("home-page.js", {testText: docs.name + ' ' + docs.content})
        })})
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

db.getAllData();
