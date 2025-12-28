import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import crypto from 'crypto';

const generateSignature = (total_amount, transaction_uuid, product_code) => {
    const secret = process.env.ESEWA_SECRET_KEY || "8gBm/:&EnhH.1/q";
    const msg = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    
    console.log("--- SIGNING MESSAGE ---");
    console.log(msg);
    console.log("-----------------------");

    return crypto.createHmac('sha256', secret).update(msg).digest('base64');
};

export const createOrder = async (req, res) => {
    try {
        const { shippingAddress, paymentMethod = 'esewa' } = req.body;
        const userId = req.user._id;

        const cart = await Cart.findOne({ user: userId });
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: 'Cart is empty' });
        }

        const rawAmount = cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const totalAmount = rawAmount.toFixed(2); 

        const order = await Order.create({
            user: userId,
            items: cart.items,
            totalAmount: parseFloat(totalAmount),
            paymentMethod,
            shippingAddress,
            paymentStatus: 'pending',
        });

        if (paymentMethod === 'esewa') {
            const transaction_uuid = order._id.toString();
            const product_code = process.env.ESEWA_PRODUCT_CODE || "EPAYTEST";
            
            const signature = generateSignature(totalAmount, transaction_uuid, product_code);

            const esewaData = {
                url: "https://rc-epay.esewa.com.np/api/epay/main/v2/form",
                formData: {
                    amount: totalAmount,
                    tax_amount: "0",
                    total_amount: totalAmount,
                    transaction_uuid: transaction_uuid,
                    product_code: product_code,
                    product_service_charge: "0",
                    product_delivery_charge: "0",
                    success_url: `${process.env.BACKEND_URL}/api/orders/esewa-verify`,
                    failure_url: `${process.env.FRONTEND_URL}/payment-failure`,
                    signed_field_names: "total_amount,transaction_uuid,product_code",
                    signature: signature
                }
            };
            return res.json({ order, esewaData });
        }

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
export const verifyEsewaPayment = async (req, res) => {
    try {
        const { data } = req.query;
        if (!data) return res.redirect(`${process.env.FRONTEND_URL}/payment-failure`);

        const decodedString = Buffer.from(data, 'base64').toString('ascii');
        const decodedData = JSON.parse(decodedString);

        const order = await Order.findById(decodedData.transaction_uuid);
        if (!order) return res.redirect(`${process.env.FRONTEND_URL}/payment-failure?error=OrderNotFound`);

        if (decodedData.status === 'COMPLETE') {
            order.paymentStatus = 'paid';
            order.esewaTransactionId = decodedData.transaction_code;
            await order.save();

            await Cart.findOneAndDelete({ user: order.user });

            return res.redirect(`${process.env.FRONTEND_URL}/payment-success?orderId=${order._id}`);
        }
        
        res.redirect(`${process.env.FRONTEND_URL}/payment-failure`);
    } catch (error) {
        console.error("Verification Error:", error);
        res.redirect(`${process.env.FRONTEND_URL}/payment-failure`);
    }
};

export const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (order) {
            if (order.user.toString() !== req.user._id.toString() && !req.user.isAdmin) {
                return res.status(401).json({ message: 'Not authorized' });
            }
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};