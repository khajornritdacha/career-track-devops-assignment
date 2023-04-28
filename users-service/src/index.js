const express = require('express')
const mysql = require('mysql')

const app = express();
app.use(express.json())

const configFile = process.env.ENV ?? 'local'
const config = require(`../conf/${configFile}.json`)

const connection = mysql.createConnection({
  host: config.userDb.host,
  port: config.userDb.port,
  user: config.userDb.user,
  password: config.userDb.password,
})

let ntry = 0
const retry = setInterval(() => {
  connection.connect((err) => {
    if (!err) {
      clearInterval(retry)
      console.log('Connected to user database')
    } else {
      console.error('Error connecting to user database', err)
      ntry += 1

      if (ntry < 15) {
        console.warn('retrying in 5 seconds')
      } else {
        console.error('giving up')
        clearInterval(retry)
        process.exit(1)
      }
    }
  })
}, 5000)

app.get('/healthcheck', (req, res) => {
  res.status(200).send('OK')
})

app.get('/user/:id', (req, res) => {
  connection.query('SELECT * FROM users.users WHERE user_id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error retrieving user')
    } else {
      if (results[0]) {
        res.status(200).send(results[0])
      } else {
        res.status(404).send(`user with id ${req.params.id} not found`)
      }
    }
  })
})

app.post('/user', (req, res) => {
  connection.query('INSERT INTO users.users (user_name) VALUES (?)', [req.body.name], (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error creating user')
    } else {
      res.status(201).send(`user with id ${results.insertId} created`)
    }
  })
})

app.get('/user/:id/products', (req, res) => {
  connection.query('SELECT * FROM users.users_product WHERE user_id = ?', [req.params.id], (err, results) => {
    if (err) {
      console.error(err)
      res.status(500).send('Error retrieving user products')
    } else {
      res.status(200).send(results)
    }
  })
})

app.listen(3000, () => {
  console.log('User service started, listening on port 3000')
})
