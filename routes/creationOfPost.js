const   router = require("express").Router(),
        passport = require("passport"),
        mongo = require("mongoose");

let db = require("../config/db"),
    NewPost = db.PostSchema;

const authCheck = (req, res, next) => {
    if(!req.user){
        //if user is not logged.
        res.redirect("/auth/login");

    } else{
        next()
    }
}


router.get("/", authCheck, (req, res)  => {
    res.render("createPost", { user : req.user });
});

router.post("/", (req, res) => {

    let title = req.body.title,
        tags = req.body.tags,
        photos = "../images/exp.jpg",
        description = req.body.description;

    new NewPost({
        title: title,
        tags: tags,
        photos: photos,
        createAt: new Date(),
        description: description,
        user: req.user.username
    }).save((err) => {
    if(err){
        console.log(err);
    }});

    res.render("mainPost")
});

module.exports = router;