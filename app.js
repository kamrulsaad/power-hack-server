const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express()

// Schema Design

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name for this product"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 character"],
        maxLength: [100, "Name is too large"]
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, "Price cannot be negative"]
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "litre", "pcs"],
            message: "Unit value cannot be {VALUE}, must be kg/litre/pcs"
        }
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity cannot be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value)
                if (isInteger) {
                    return true
                } else {
                    return false
                }
            }
        },
        message: "Quantity must be an Integer."
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["In stock", "Out of Stock", "Discontinued"],
            message: "status cannot be {VALUE}"
        }
    },
    // supplier: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "Supplier"
    // },
    // categories : [{
    //     name: {
    //         type: String,
    //         required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    // }]
}, {
    timestamps: true,
})

// Schema -> Model -> Query

const Product = mongoose.model("Product", productSchema)


// middlewares
app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.send("Route is working!")
})

app.post('/api/v1/product', async (req, res, next) => {

    try {
        const product = new Product(req.body)
        const result = await product.save()
        res.status(200).json({
            status: "success",
            message: "Data inserted successfylly!",
            data: result
        })
    }
    catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'Data is not inserted',
            error: error.message
        })
    }


})

module.exports = app