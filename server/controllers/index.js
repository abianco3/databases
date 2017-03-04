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
        //on completion write response
        //send response back to client w/some expected data

    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // ask the database for the users
        // on completion send the reponse with users as body
    },
    post: function (req, res) {
      // receive the username and send to the model
        // on completion  write response
        // send response to the client with data
    }
  }
};


      
