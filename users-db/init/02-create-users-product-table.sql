CREATE TABLE users_product (
  user_id INT NOT NULL,
  product_id VARCHAR(255) NOT NULL,
  PRIMARY KEY (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

GRANT SELECT, INSERT, UPDATE, DELETE on users_product to 'user_service';
