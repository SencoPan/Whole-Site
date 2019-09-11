let mongoClient = require("mongodb").MongoClient;

let mongoose = require("mongoose")

let Schema = mongoose.Schema;

let userSchema = new Schema({
    login       : { type: String, unique: true },
    email       : { type: String, unique: true },
    password    : { type: String },
    firstName   : String,
    secondName  : String
})
let User = mongoose.model("Users", userSchema);
mongoose.set('useCreateIndex', true);

let state = {
    db: null
}

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
}

const chech = function(number){
    state.db.collection('users').find().toArray((err, docs) => {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        if (number == undefined) {
            return console.log(docs)
        } else {
            return console.log(docs[number])
        }
    })
}
module.exports.User = User;
module.exports.getAllData = (number) =>{
    setTimeout(() => (chech(number)), 5000)
}
