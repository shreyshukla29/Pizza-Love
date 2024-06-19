const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true

    },

    items: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: {
            type: Number,
            required: true,
            default: 1,
          },
        },
      ],
    totalPrice :{
        type:Number,
        required:true
    },

    status :{
        type:String,
        required:true,
        enum: ['ORDERED','CANCELLED' ,'PROCESSING','OUT_FOR_DELIVERY','DELIVERED'],
        default: 'ORDERED',
    },
    address:{
        type: String,
        minLength:[10 , 'Address should be of atlest 10 characters'],
        required:true,

    },
    paymentMethod : {
        type:String,
        enum:['ONLINE','COD'],
        default:'COD',
        required:true,

    },

},  {
    timestamps: true,
  });

const Order = mongoose.model('Order',OrderSchema);

module.exports = Order