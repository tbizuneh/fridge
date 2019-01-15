DROP DATABASE IF EXISTS fridgeitems;
CREATE DATABASE fridgeitems;
USE fridgeitems;

CREATE TABLE items (
  iD int NOT NULL AUTO_INCREMENT,
  item VARCHAR(250) NOT NULL,
  PRIMARY KEY (id)
);

INSERT INTO items (item)
VALUES("Cheese")