var mongoClient = require("mongodb").MongoClient;

var state = {
    db: null
}

exports.connect = (url, done) => {
    if(state.db){
        return done();
    }
    mongoClient.connect("mongodb://localhost:27017/nodeExp", {useNewUrlParser: true},(err, database) =>{
        if(err){
            return console.log(err);
        }
        state.db = database.db("dedas");
        done(false, state.db);
    });
}

const chech = function(number){
    state.db.collection('artists').find().toArray((err, docs) => {
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
module.exports.getAllData = (number) =>{
    setTimeout(() => (chech(number)), 5000)
}
