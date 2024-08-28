const  express = require("express");
const router = express.Router();
const { check } = require("express-validator")
const {register, login,getUserData,getProduct,createOrder,getUserOrders}= require("../controllers/userController");

const authMiddleware= require("../middeleware/authMiddleware")

router.post("/register",
    
    [
        check("email", "Email is not valid").isEmail().normalizeEmail(),
        check(
            "password",
            "Your password must be at least 8 characters long, with one number, one symbol, one uppercase, and one lowercase "
        ).isStrongPassword({
            minLength: 8,
            minLowercase: 1,
            minSymbols: 1,
            minUppercase: 1,
        }),
    ],
    
    register);




router.post("/login", login);
router.get("/",authMiddleware, getUserData);
router.get("/getproduct",getProduct)
router.post("/createorder",authMiddleware,createOrder)
router.get("/getuserorders",authMiddleware,getUserOrders)



module.exports=router