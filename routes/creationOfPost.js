const   router = require("express").Router(),
        passport = require("passport"),
        mongo = require("mongoose");

let db = require("../config/db");

const authCheck = (req, res, next) => {
    if(!req.user){
        //if user is not logged.
        res.redirect("/auth/login");

    } else{
        next()
    }
}


router.get("/", (req, res)  => {
    res.render("createPost", { user : req.user });
});

module.exports = router;