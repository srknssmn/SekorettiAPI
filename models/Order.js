import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const OrderSchema = new Schema({

    no: {type: Number},
    orders: {type: Array},
    ordersInfo: [
        {   
            orderName: String,
            orderValue: Number,
            orderQuantity: Number
        }
    ],
    totalValue: {type: Number},
    orderPaid: {type: Boolean},
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Order = mongoose.model('Order', OrderSchema);
export default Order;