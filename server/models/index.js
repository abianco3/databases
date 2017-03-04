var db = require('../db');
var Promise = require('bluebird');
var query = function(queryString) {
  return new Promise(function(resolve, reject) {
    db.query(queryString, function(err, rows, fields) {
      if (err) {
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
};

module.exports = {
  messages: {
    get: function () {
      // return new Promise(function(resolve, reject) {
      //   db.query('SELECT messages.text, messages.roomname, users.username FROM messages, users where messages.username = users.id', function(err, rows, fields) {
      //     if (err) {
      //       reject(err);
      //     } else {
      //       console.log(rows);
      //       var messages = rows.map((row) => {
      //         return {
      //           text: row.text,
      //           roomname: row.roomname,
      //           username: row.username
      //         };
      //       });
      //       resolve(messages);
      //     }
          
      //   });        
      // });
      return query('SELECT messages.id, messages.text, messages.roomname, users.username FROM messages, users where messages.username = users.id')
      .then(function(rows) {
        var messages = rows.map((row) => {
          return {
            objectId: row.id,
            text: row.text,
            roomname: row.roomname,
            username: row.username
          };
        });
        return messages;
      });
    }, // a function which produces all the messages
    post: function (message) {
      // create user if it doesn't exist
     
      var usernameQueryString = 'INSERT into users (username) SELECT username FROM (SELECT "' + message.username + '" username) users WHERE NOT EXISTS (SELECT username FROM users WHERE username ="' + message.username + '")';

      var postQueryString = 'insert into messages (text, roomname, username) values ("' + message.text + '", "' + message.roomname + '", (SELECT id FROM users WHERE username = "' + message.username + '"))';
      
      var lastMessageQueryString = 'SELECT * from messages where id = LAST_INSERT_ID()';
      
      query(usernameQueryString);

      query(postQueryString);

      return query(lastMessageQueryString)
      .then(function(row) {
        var message = {
          objectId: row.id,
          text: row.text,
          roomname: row.roomname,
          username: row.username
        };
        resolve(message);
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

