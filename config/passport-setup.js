const   passport = require("passport"),
        GoogleStrategy = require("passport-google-oauth20"),
        secretKeys = require("./keys");

let db = require("./db"),
    NewUserGoogle = db.UserGoogle;

db.connect("mongodb://localhost:27017/nodeExp",(err, state) =>{
    if(err){
        return console.log(err);
    }
    db = state;
});

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    NewUserGoogle.findById(id).then( (user) => {
        done(null, user);
    } )
});

passport.use(
    new GoogleStrategy({
        //options
        callbackURL: "/auth/google/redirect",
        clientID: secretKeys.google.clientID,
        clientSecret: secretKeys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
        console.log("passport callback function");
        console.log(profile);

        NewUserGoogle.findOne({googleid : profile.id}).then((currentUser) => {
            if (
                currentUser === undefined ||
                currentUser === null ||
                currentUser === ''
            ){
                new NewUserGoogle({
                        username: profile.displayName,
                        googleid: profile.id,
                        imageURL: profile.photos[0].value
                    }
                ).save().then((newUser) => {
                    console.log("New google user have been created!" + newUser);
                    done(null, newUser);
                })
            }
            else{
                //user exist
                console.log("user exist " + currentUser);
                done(null, currentUser);
            }
        }, (err) => {
            console.log(err);
        })
    })
);