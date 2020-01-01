const router = require('express').Router(),
    keys = require('../config/keys'),
    request = require('request'),
    authState = require('./login').authState,
    User = require('../config/db').User;

router.get('/reg', authState.isNotAuthorised,(req, res) => {
    res.render("registration");
});

router.post('/reg', (req, res)=>{
    if(
        req.body.captcha === undefined ||
        req.body.captcha === ''        ||
        req.body.captcha === null
    ){
        return false;
    }

    //secret Key
    const secretKey = keys.captcha.secretKey;

    //verify URL
    const vrfUrl = `https://google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${req.body.captcha}&remoteip=${req.connection.remoteAddres}`;

    //request
    request(vrfUrl, (err, response, body) => {
        body = JSON.parse(body);

        // if not successful
        if (body.success !== undefined && !body.success) {
            return false;
        }


        // If successful

        let dataRes = req.body;

        let newUser = new User();

        newUser.login = dataRes.login;
        newUser.email = dataRes.email;
        newUser.firstName = dataRes.firstName;
        newUser.secondName= dataRes.secondName;
        newUser.password = newUser.encryptPassword(dataRes.password);

        new Promise((resolve, reject) => {
            newUser.save((err, newUser) => {
               err ? reject(err) : resolve(newUser);
            });

        }).then((newUser) => {
            req.session.user = newUser;
            console.log(req.session.user);
        }).then(() => {
            req.session.save();
            res.json({code:200, message:'success'});
        });
    })
});

module.exports = router;