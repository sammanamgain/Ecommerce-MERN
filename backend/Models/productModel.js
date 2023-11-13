const mongoose = require("mongoose");
const productSchema = new mongoose.Schema({
  name: { type: String, required: [true, "Please Enter the product Name"] },
  description: {
    type: String,
    required: [true, "please Enter Product Description"],
  },
  price: {
    type: Number,
    required: [true, "pleae Enter the proudce description"],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    ],
    category: {
        type: String,
        required:[true,'Please Enter Product Category']
      
    },
    stock: {
        type: Number,
        required: [true, 'Please Enter Product Stock'],
        maxlength: [4, "Stock cann't exceed 4 character"],
        default:1
    },
    numofReviews: {
        type: Number,
        default:0
        
    },
    reviews: [
        {
        name: {
            type: String,
            required:true
        },
        rating: {
            type: Number,
            required:true
        },
        comment: {
            type: String,
            required:true
        }
        }
    ],
    createdAt: {
        type: Date,
        default:Date.now()
    }
});


module.exports=mongoose.model("product",productSchema)