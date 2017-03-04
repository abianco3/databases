CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  /* Describe your table here.*/
  id integer auto_increment, text varchar(150), roomname varchar(50), username
integer references username(id), primary key (id)

);

/* Create other tables and define schemas for them here! */

CREATE TABLE users (
  id integer auto_increment, username varchar(50), primary key (id)
);

/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

