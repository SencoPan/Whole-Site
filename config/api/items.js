const router = require('express').Router();


let db = require("../db"),
    ItemModel = db.ItemModel;

router.get('/', (req, res) => {
    ItemModel.find()
        .sort({date: -1})
        .then(items => {res.json(items)})
})

module.exports = router;

