const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()

const productRoute = require('./routes/products.route')


// middlewares
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Route is working!")
})

app.use('/api/v1/product', productRoute)

module.exports = app