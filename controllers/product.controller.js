const { getProductsService, createProductService } = require("../services/product.services")


exports.getProducts =  async(req, res, next) => {
    try{
        const products = await getProductsService()
        res.status(200).json({
            status: "success",
            data: products
        })
    }catch(error){
        res.status(400).json({
            status: "fail",
            message: "Cannot get the data",
            error: error.message
        })
    }
}

exports.createProducts = async (req, res, next) => {

    try {

        const result = await createProductService(req.body)

        result.logger()

        // const product = new Product(req.body)
        // const result = await product.save()

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


}