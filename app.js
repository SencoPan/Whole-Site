const   createError = require('http-errors'),
        express = require('express'),
        path = require('path'),
        cookieParser = require('cookie-parser'),
        bodyParser = require('body-parser'),
        logger = require('morgan'),
        request = require('request'),
        authRouters = require('./routes/login.js'),
        registration = require('./routes/registration.js'),
        profileRouters = require('./routes/profile'),
        sassMiddleware = require('node-sass-middleware'),
        passportSetup = require('./config/passport-setup'),
        passport = require('passport'),
        secretKeys = require('./config/keys'),
        cookieSession = require('cookie-session'),
        creationOfPost = require("./routes/creationOfPost");

let ObjectID = require('mongodb').ObjectID,
      db = require("./config/db");

const User = db.User;
const Posts = db.PostSchema;

let app = express();

let urlencodedParser = bodyParser.urlencoded({ extended : false });

db.connect("mongodb://localhost:27017/nodeExp",(err, state) =>{
  if(err){
      console.log(err);
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

app.use(cookieSession(
    {
        maxAge: 24 * 60 * 60 * 1000,
        keys: [secretKeys.session.cookieKey]
    }
));

app.use(passport.initialize());
app.use(passport.session());

app.use(cookieParser());
app.use(logger('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

//All routes
app.use('/auth', authRouters, registration);
app.use('/profile', profileRouters);
app.use('/CreatePost', creationOfPost);

app.post("/login", (req, res) =>{
    let username = req.body.login;
    let password = req.body.password;

    db.collection("users").findOne({ login : username, password: password }, (err, user) => {
        if(err){
            console.log(err);
        }
        if(!user){
            return res.sendStatus(404);
        }
        else{
            res.redirect(307, "/");
        }
    });
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

app.get("/", (req, res) => {
    Posts.find((err, data) => {
        if (err) return console.error(err);
        res.render("mainPost", {user: req.user || req.session.user, posts: data});
    })
});

app.get("/check", (req, res) => {
    res.render("mainLayout")
});

app.get('/test', (req, res) => {
    res.sendFile(__dirname + "/htmlTest.html")
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
          res.render("home-page", {testText: docs.name + ' ' + docs.content})
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