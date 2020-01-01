const router = require('express').Router();
const authState = require('./login').authState;

router.get('/', authState.isAuthorised, (req, res) => {
    let userLogin;

    req.user ?
        user = {
            login : req.user.username,
            image: req.user.imageURL
        } :
        user = {
            login: req.session.user.login,
            image: null
     };

    res.render('profile', {
        checkForUser : user.login,
        imageURL:  user.image
    });
});

module.exports = router;