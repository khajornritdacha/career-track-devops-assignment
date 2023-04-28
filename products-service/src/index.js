const express = require('express')

const app = express();
app.use(express.json())

const configFile = process.env.ENV ?? 'local'
const config = require(`../conf/${configFile}.json`)

const { MongoClient, ObjectId } = require('mongodb');

const client = new MongoClient(config.productsDb.url, {
  authSource: 'products',
  auth: {
    username: config.productsDb.username,
    password: config.productsDb.password
  }
})
const collection = client.db('products').collection('products')

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK')
});

app.get('/products', (req, res) => {
  collection.find().toArray().then((products) => {
    res.status(200).send(products)
  })
})

app.get('/product/:id', (req, res) => {
  collection.findOne({ _id: new ObjectId(req.params.id) }).then((product) => {
    if (product) {
      res.status(200).send(product)
    } else {
      res.status(404).send(`product with id ${req.params.id} not found`)
    }
  }).catch((err) => {
    console.error(err)
    res.status(500).send('Error retrieving product')
  })
})

app.post('/product', (req, res) => {
  collection.insertOne({
    name: req.body.name,
    price: req.body.price
  }).then((result) => {
    res.status(201).send(`product with id ${result.insertedId} created`)
  }).catch((err) => {
    console.error(err)
    res.status(500).send('Error creating product')
  })
})

client.connect().then(() => {
  app.listen(3001, () => {
    console.log('Product service started, listening on port 3001')
  })
})
