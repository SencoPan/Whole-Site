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
    res.render('profile');
});

module.exports = router;