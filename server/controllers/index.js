var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      // ask the database for the messages
      
      models.messages.get().then(
        function(value) {
          // console.log(value);
          res.writeHead(200, {'Content-Type': 'application/json'});
          res.end(JSON.stringify({results: value}));
        }
      ).catch(function(err) {
        // res.end();
        console.log(err);
      }
      );
      // define callback with response handler either separately here, or in 
      // invoking the model.messages.get function
        // on completion send messages to client
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      //receive message and send to model
      // console.log(req.body);
      models.messages.post(req.body)
      .then(function(message) {
        res.end(JSON.stringify(message));
      });
      // console.log(req.body.text);
        //on completion write response
        //send response back to client w/some expected data

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // ask the database for the users
      models.users.get(req.body)
      .then(function(usernames) {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({results: usernames}));
      })
      .catch(function(err) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end();
      });
        // on completion send the reponse with users as body
    },
    post: function (req, res) {
      // receive the username and send to the model
      models.users.post(req.body)
      .then(function() {
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({results: req.body}));
      })
      .catch(function(err) {
        res.writeHead(500, {'Content-Type': 'application/json'});
        res.end();
      });
        // on completion  write response
        // send response to the client with data
    }
  }
};


      
