db.createUser(
  {
    user: "products_service",
    pwd: "products_service_sQOpCA3Y4V",
    roles: [
      {
        role: "readWrite",
        db: "products"
      }
    ]
  }
)
