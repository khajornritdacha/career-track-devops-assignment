# ChAMP devOps assignment

## To setup and run this project

1. Install **docker compose**
2. Run `sudo docker-compose up --build`  
   2.1 add `-d` flag to run in detached mode  
   2.2 To **run multiple containers simultaneously**, run  
   `sudo docker-compose up --scale products-service=3 --scale users-service=3 --build`  
   and replace 3 with the number of desired containers.

## Business Requirements

### Product service

- `GET /product/:id` to get detail of the product
- `POST /product` with id sending in the body as JSON to create new product

### User service

- `GET /user/:id` to get detail about the user
- `GET /user/:id/product` to get lists of products user owned
- `POST /user/:id/product` to add new product to the user
- `POST /user` to create new user
