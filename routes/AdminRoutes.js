const  express = require("express");
const router = express.Router();
const adminMiddleware = require("../middeleware/adminMiddleware")

const {addProduct, updateProduct,deleteProduct,getOrders}= require("../controllers/adminController");



router.post("/addProduct", adminMiddleware, addProduct);
router.put("/updateproduct/:id",adminMiddleware, updateProduct);
router.delete("/deleteproduct/:id", adminMiddleware,deleteProduct);
router.get("/getorders", getOrders)

module.exports=router