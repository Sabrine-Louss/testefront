const mongoose= require("mongoose")

const orderSchema= mongoose.Schema({
    createAt:{
        type:Date,
        default: new Date()
        
    },
       Products:Array,
       owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "users"
       }
})

const Order = mongoose.model("order",orderSchema)
module.exports = Order 