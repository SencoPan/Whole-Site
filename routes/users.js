var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get("/test/:id", (req, res)=>{
  db.collection('artists').updateOne(
      { _id: ObjectID(req.params.id) },
      { $set : { name: "the name of the lord" } },
      (err) => {
        if(err) {
          console.log(err);
          return res.sendStatus(500)
        }
        db.collection('artists').findOne({_id: ObjectID(req.params.id)}, (err, docs) => {
          if (err) {console.log(err);
            return res.sendStatus(500);
          }
          console.log(docs);
          res.render("home-page.js", {testText: docs.name + ' ' + docs.content})
        })})
})

module.exports = router;
