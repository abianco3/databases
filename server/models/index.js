var db = require('../db');
var Promise = require('bluebird');

module.exports = {
  messages: {
    get: function () {
      return new Promise(function(resolve, reject) {
        db.query('SELECT messages.text, messages.roomname, users.username FROM messages, users where messages.username = users.id', function(err, rows, fields) {
          if (err) {
            reject(err);
          } else {
            console.log(rows);
            var messages = rows.map((row) => {
              return {
                text: row.text,
                roomname: row.roomname,
                username: row.username
              };
            });
            resolve(messages);
          }
          
        });        
      });
    }, // a function which produces all the messages
    post: function (message) {
      //extract username from users table using messages.username
      db.query('SELECT users.username where users.username = ' + message.username, function (err, rows, fields) {

      });
      //if username does not exist in users table
        //insert message.username into users table


      //insert message.text, message.roomname, and users.id (using message.username) into messages table

      //resolve message object

    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

