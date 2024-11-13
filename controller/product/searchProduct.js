import productModel from "../../models/productModel.js"


const searchProduct = async (req, res)=>{
    try {
        const query = req.query.q

        const regex = new RegExp(query,'i','g')

        const product = await productModel.find({
            "$or" : [
                {
                    productName : regex
                },
                {
                    category : regex
                }
            ]
        })


      res.status(200).send({
          data:product,
          message:"search product list",
          error:false,
          success:true
      })
    } catch (error) {
        res.status(400).send({
            message: error?.message || error,
            success:true,
            error:false
        })
    }
}


export default searchProduct