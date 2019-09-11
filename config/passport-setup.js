const passport = require("passport");
const GoogleStategy = require("passport-google-oauth20");
const secretKeys = require("./keys");
passport.use(
    new GoogleStategy({
        //options
        callbackURL: "/auth/google/redirect",
        clientID: secretKeys.google.clientID,
        clientSecret: secretKeys.google.clientSecret
    },
    () => {
        //callback
    })
);