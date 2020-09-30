DROP DATABASE IF EXISTS burgers_db;
CREATE database burgers_db;

USE burgers_db;

CREATE TABLE burgers (
  id INT NOT NULL AUTO_INCREMENT,
  burger_name VARCHAR(30) UNIQUE NOT NULL,
  devoured BOOLEAN default false, 
  PRIMARY KEY (id)
);

