import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
   brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        
    },
    category:{
        type:String,
        required:true
    }
});

export const ProductModel = mongoose.model('Products', productSchema);