const passport = require("passport");
const GoogleStategy = require("passport-google-oauth20");

passport.use(
    new GoogleStategy({
        //options
        clientID: "229158803880-no1r97487eh62meqsj6gk6aptm30l4n1.apps.googleusercontent.com",
        clientSecret: "heijHs9i7JG6WiZMzUQ-7RcL"
    }),
    () => {
        //callback
    }
);