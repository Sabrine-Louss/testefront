const Product = require("../models/productSchema");
const Order = require("../models/orderSchema");




// Description: ADDPRODUCT Role: admin
// Method: POST
// Path: /addproduct 
// Access: Privet 
const addProduct = async (req, res) => {
    try {
        

        const { title, description, price , poster } = req.body;
        const newProduct = await Product.create( req.body );

        return res.status(201).json({ msg: "Product added succefully",  product: newProduct });
    }
     catch (err) {
        return res.status(500).json({ msg: "Something went wrong during adding product", err: err.message });
    }
};






// Description: updateProduct role: admin
// Method: PUT
// Path: /updateProduct/:id
// Access: PRIVET

const updateProduct = async (req, res) => {
    try {
        

        
        const updateProduct = await Product.findByIdAndUpdate( req.params.id,{...req.body});

        return res.status(201).json({ msg: "Product updated ", updateProduct });
    }
     catch (err) {
        return res.status(500).json({ msg: "Something went wrong during updating product", err: err.message });
    }
};



// Description: deleteProduct role: admin
// Method: delete
// Path: /deleteProduct
// Access: PRIVET

const deleteProduct = async (req, res) => {
    try {
        

        
        const deleteProduct = await Product.findByIdAndDelete( req.params.id);

        return res.status(201).json({ msg: "Product deleted ", deleteProduct });
    }
     catch (err) {
        return res.status(500).json({ msg: "Something went wrong during deleting product", err: err.message });
    }
};







// Description:  getOrders role: admin
// Method: get
// Path: /getOrders
// Access: PRIVET

const getOrders = async (req, res) => {
    try {
        

        
        const getOrders = await Order.find();

        return res.status(201).json({ msg: "Product founded succefully",  getOrders });
    }
     catch (err) {
        return res.status(500).json({ msg: "Something went wrong during finding product", err: err.message });
    }
};

module.exports = { addProduct,getOrders,deleteProduct,updateProduct}
