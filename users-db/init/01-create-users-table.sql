CREATE TABLE users (
  user_id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(255),
  PRIMARY KEY (user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE on users to 'user_service';
