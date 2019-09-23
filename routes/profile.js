const router = require('express').Router();

const authCheck = (req, res, next) => {
    if(!req.user){
        //if user is not logged.
        res.redirect("/auth/login");

    } else{
        next()
    }
}

router.get('/', authCheck, (req, res) => {
    res.render('profile', { checkForUser : req.user.username});
});

module.exports = router;