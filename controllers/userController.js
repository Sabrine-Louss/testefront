const User = require("../models/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {validationResult}= require("express-validator");
const Product = require("../models/productSchema");
const Order= require("../models/orderSchema")
// Description: Register user
// Method: POST
// Path: /register 
// Access: Public 
const register = async (req, res) => {
    try {
        const errors= validationResult(req)
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array()})

        }
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ msg: "User already exists, try to login" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({ email, name, password: hashedPassword });
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });

        return res.status(201).json({ msg: "User created", token: token, user: newUser });
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong during registration", err: err.message });
    }
};

// Description: Login user
// Method: POST
// Path: /login 
// Access: Public 
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: "User does not exist, try to register" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Wrong password, try again" });
        }

        const token = jwt.sign({ id: user._id,role:user.role }, process.env.JWT_SECRET_KEY, { expiresIn: "30d" });

        return res.status(200).json({ msg: "Login success", token: token, user: user });
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong during login", err: err.message });
    }
};

// Description: Get user data
// Method: GET
// Path: /
// Access: Public 
const getUserData = async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.body.userId });

        if (!user) {
            return res.status(400).json({ msg: "User does not exist in the database" });
        }

        return res.status(200).json({ msg: "User info success", user: user });
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong while getting user info", err: err.message });
    }
};



// Description: getProduct role user
// Method: GET
// Path: /getproduct
// Access: Public 
const getProduct = async (req, res) => {
    try {
        const products = await Product.find();

 res.status(201).json({ msg: "get all product", products: products });
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong in the get product with user", err: err.message });
    }
};


// Description: createOrder role user
// Method: post
// Path: /createOrder
// Access: Public 
const createOrder = async (req, res) => {
    try {
        const{userId,productlist}= req.body
        const newOrder = await Order.create({Products:productlist,owner:userId });

 res.status(201).json({ msg: "send order !", newOrder: newOrder });
    } 
    catch (err) {
        return res.status(500).json({ msg: "Something went wrong while order", err: err.message });
    }
};


// Description: getUserOrders role user
// Method: get
// Path: /getUserOrders
// Access: Public 
 
const getUserOrders = async (req, res) => {
    try {
        const {userId} = req.body
        const userOrder = await Order.find({owner:userId});
        
 res.status(201).json({ msg: "get all user orders", userOrder:userOrder });
    } catch (err) {
        return res.status(500).json({ msg: "Something went wrong in the get order with user", err: err.message });
    }
};




module.exports = { register, login, getUserData , getProduct, createOrder ,getUserOrders};
