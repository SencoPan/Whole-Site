const   router = require("express").Router(),
        passport = require("passport");

router.get('/login', (req, res) => {
    res.render('login');
});

router.post("/login", (req, res) =>{
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

router.get("/logout", (req, res) => {
    req.logout();
    req.session = null;
    res.redirect("/");
});

router.get("/google", passport.authenticate("google", {
    scope: ["profile"]
}));

router.get("/google/redirect", passport.authenticate("google"),(req, res) => {
    res.redirect("/profile");
});

module.exports = router;