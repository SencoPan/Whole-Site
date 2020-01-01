const router = require('express').Router(),
    Posts = require('../config/db').PostSchema;

router.get("/", (req, res) => {
    Posts.find((err, data) => {
        if (err) return console.error(err);
        res.render("mainPost", {user: req.user || req.session.user, posts: data});
    })
});

router.get("/check", (req, res) => {
    res.render("mainLayout")
});


module.exports = router;