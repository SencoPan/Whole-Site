const router = require('express').Router();

let db = require("../db"),
    ItemModel = db.ItemModel;

let ObjectID = require('mongodb').ObjectID;

router.get('/get', (req, res) => {
    ItemModel.find()
        .sort({date: -1})
        .then(items => {res.json(items)})
})

router.post("/create", (req, res) => {
    new ItemModel({
        "name": req.body.item.name
    }).save().then((newUser) => {
        console.log("New google user have been created!" + newUser);
    })
})

router.post("/delete", (req, res) => {
    console.log(ObjectID(req.body.id));
    ItemModel.deleteOne({_id: ObjectID(req.body.id)}).then(console.log("success!"));
});

module.exports = router;

