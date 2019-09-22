const   router = require("express").Router(),
        passport = require("passport"),
        mongo = require("mongoose");

let db = require("../config/db");

db.connect("mongodb://localhost:27017/nodeExp",(err, state) =>{
    if(err){
        return console.log(err);
    }
    db = state;
});

router.get('/login', (req, res) => {
    res.render('login');
})

router.get("/logout", (req, res) => {
    res.send("logging out")
})


router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}))

router.get("/google/redirect", passport.authenticate("google"),(req, res) => {
    res.redirect("/profile/");
})

module.exports = router;