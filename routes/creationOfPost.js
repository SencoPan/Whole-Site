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


router.get("/", (req, res)  => {
    res.render("createPost", { user : req.user });
});

router.post("/", (req, res) => {

    let title = req.body.title,
        tags = req.body.tags,
        photos = req.body.photos,
        description = req.body.description;

    new NewPost({
        title: title,
        tags: tags,
        photos: photos,
        createAt: new Date(),
        description: description,
        user: req.user.login
    }).save((err) => {
    if(err){
        console.log(err);
    }});

    res.render("mainPost")
});

module.exports = router;