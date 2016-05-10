var express = require("express");
var User = require("../models").User;
var bodyParser = require("body-parser");

var router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

//router.get("/

//;am- Descr(text), Spots ({ instrument: text, skill_level: text, user:}, type JamSpot), Creator(type User)
//User- Username, Password
//

router.get("/users", function(req, res) {

});

router.post("/users", function(req, res) {
  //create the account and log the user in
  var user = new User({ username: req.body.username, password: req.body.password, user_type: req.body.user_type });
  
  User.find({ username: req.body.username }) .then(function success(docs, err) 
  {
    if(err)
    {
      debugger;
      res.status(200).write(JSON.stringify({
        response_type: 'reject',
        response_msg: 'Duplicate Users in DB'
      }));

      return;
    }

    res.set({
      "Content-Type": "application/json"
    });

    if(docs.length == 0)
    {
      console.log('new user!');
      user.save();

      res.write(JSON.stringify({
        response_type: 'accept'
      }));
      res.end();
    }
    else if(docs.length == 1)
    {
      res.write(JSON.stringify({
        response_type: 'reject',
        response_msg: 'User already exists'
      }));
    }
    else if(docs.length > 1)
    {
      res.write(JSON.stringify({
        response_type: 'reject',
        response_msg: 'Duplicate Users in DB'
      }));
    }
  },
  function error(err)
  {
    debugger;
    console.log('Query error!');
    res.writeHead(500);
    res.end();
  }).catch(function(exception) {
    console.log(exception);
    /*
    res.writeHead(500);
    res.end();
    */
  });
});

module.exports = router;
