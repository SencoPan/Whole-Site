const mongoClient = require("mongodb").MongoClient,
    bcrypt = require('bcrypt-nodejs'),
    mongoose = require("mongoose");

let Schema = mongoose.Schema;

let googleUserSchema = new Schema({
    username : { type : String, unique: false },
    googleid : { type : String, unique: true  },
    imageURL : { type : String, unique: false },
});

let itemModel = new Schema({
    name: {type : String, unique: false}
});

let userSchema = new Schema({
    login       : { type: String, unique: true },
    email       : { type: String, unique: true },
    password    : { type: String },
    firstName   : String,
    secondName  : String
});

let postSchema = new Schema({
    title       : { type: String, unique: true },
    tags        : String,
    photos      : String,
    description : String,
    createAt    : Date,
    user        : String
});

// User hash for passwords

userSchema.methods.encryptPassword = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null)
};
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password)
};

let  User = mongoose.model("Users", userSchema),
     ItemModel = mongoose.model("items", itemModel),
     UserGoogle = mongoose.model("UsersGoogle", googleUserSchema),
     PostSchema = mongoose.model("PostSchema", postSchema);

mongoose.set('useCreateIndex', true);

let state = {
    db: null
};

exports.connect = (url, done) => {
    if(state.db){
        return done();
    }
    mongoose.connect('mongodb://localhost:27017/nodeExp', {useNewUrlParser: true});
    mongoClient.connect("mongodb://localhost:27017/nodeExp", {useNewUrlParser: true},(err, database) =>{
        if(err){
            return console.log(err);
        }
        state.db = database.db("nodeExp");
        done(false, state.db);
    });
};

const chech = function(number){
    state.db.collection('users').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (number === undefined) {
            return console.log(docs)
        } else {
            return console.log(docs[number])
        }
    })
};

module.exports.User = User;
module.exports.UserGoogle = UserGoogle;
module.exports.ItemModel = ItemModel;
module.exports.PostSchema = PostSchema;

module.exports.getAllData = (number) =>{
    setTimeout(() => (chech(number)), 3000)
};
