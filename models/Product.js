const mongoose = require('mongoose');

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

//mongoose middleware for saving data

productSchema.pre('save', function (next) {
    console.log('Before saving data')
    if (this.quantity === 0) {
        this.status = "Out of Stock"
    }
    next()
})

// productSchema.post('save', function (doc, next) {
//     console.log("After saving Data");
//     next()
// })

productSchema.methods.logger = function(){
    console.log(`Data saved for ${this.name}`)
}

// Schema -> Model -> Query

const Product = mongoose.model("Product", productSchema)

module.exports = Product