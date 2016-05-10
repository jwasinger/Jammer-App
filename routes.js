var express = require('express');
var User = require('./models').User;
var api_routes = require('./api/api');
var Session = require("./Session");

var bodyParser = require("body-parser");

var router = express.Router();

Session.CreateMemStore(router);

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

function auth_middleware(req, res, next) {
  if(req.session.username)
    return next();

  res.redirect("/login");
}

router.get('/', auth_middleware, function(req, res) {
  res.render('index.html');
});

router.use('/api', api_routes);

router.get('/startjam', function(req, res) {
  res.render('startjam.html');
});

router.get('/signup', function(req, res) {
  res.render('signup.html');
});

router.get('/login', function(req, res) {
  res.render('login.html');
});

router.post('/login', function(req, res)
{
  if(req.body.username == undefined || 
     req.body.password == undefined)
  {
    res.status(200).send({
      success: false,
      error: 'no_user_pw'
    });

    return;
  }

  var users = User.find({username: req.body.username, password: req.body.password}).then(function success(data)
  {
    if(data.length == 1)
    {
      //only one matching user account found.
      //create a new session for the user 
      req.session.username = data[0].username;
      req.session.user_type = data[0].user_type;
      req.session.address = req.connection.remoteAddress;

      req.session.save(function(error)
      {
        if(error)
        {
          console.log(error);
          res.status(500).end();
          res.end();
        }
        else {
          res.status(200).send({
            success: true, 
          });
          res.end();
        }
      });
    }
    else if(data.length > 1)
    {
      logger.log('Duplicate user error for: '+req.body.username);
      res.send(500);
    }
    else
    {
      res.status(200).send({
        success: false,
        error: 'auth'
      });
    }
  },
  function(err)
  {
    console.log('Mongo Error: '+err);
    res.status(500).end();
  })
  .catch(function(exception) {
    console.log(exception);
  });
});

router.get("/viewjam", function(req, res) {
  if(!req.query.title) {
    res.status(404).send();
  }
  
  res.render("viewjam.html");
});

module.exports = router;
