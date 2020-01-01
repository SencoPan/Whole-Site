const   router = require("express").Router(),
        User = require('../config/db').User,
        passport = require("passport");


const authState = {
    isAuthorised : (req, res, next) => {
        if (req.user || req.session.user) {
            return next();
        }
        res.redirect('/');
    },
    isNotAuthorised:(req, res, next) => {
        if (!(req.user || req.session.user)) {
            return next();
        }
        res.redirect('/');
    }
};

router.get('/login', authState.isNotAuthorised,(req, res) => {
    res.render('login');
});

router.post("/login", (req, res) =>{
    let username = req.body.login;
    let password = req.body.password;

    User.findOne({ login : username}, (err, user) => {
        if(err){
            console.log(err);
        }
        if(!user){
            return res.sendStatus(404);
        }
        if (!user.validPassword(password)){
            return res.sendStatus(401);
        }
        else{
            req.session.user = user;
            res.redirect('/profile');
        }
    });
});

router.get("/logout", authState.isAuthorised,(req, res) => {
    req.logout();
    req.session = null;
    res.redirect("/");
});

router.get("/google", authState.isNotAuthorised,passport.authenticate("google", {
    scope: ["profile"]
}));

router.get("/google/redirect", authState.isAuthorised,passport.authenticate("google"),(req, res) => {
    res.redirect("/profile");
});


module.exports = router;
module.exports.authState = authState;