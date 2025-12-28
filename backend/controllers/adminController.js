import Cart from '../models/Cart.js';
import User from '../models/User.js';

export const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find({})
            .populate('user', 'name email _id')
            .sort({ createdAt: -1 });

        const cartsWithUsers = carts.map(cart => ({
            _id: cart._id,
            user: {
                _id: cart.user._id,
                name: cart.user.name,
                email: cart.user.email,
            },
            items: cart.items,
            itemCount: cart.items.reduce((sum, item) => sum + item.quantity, 0),
            totalValue: cart.items.reduce((sum, item) => sum + (item.price * item.quantity), 0),
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt,
        }));

        res.json(cartsWithUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAdminStats = async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalAdmins = await User.countDocuments({ isAdmin: true });
        const totalCarts = await Cart.countDocuments();
        
        const allCarts = await Cart.find({});
        const totalItems = allCarts.reduce((sum, cart) => {
            return sum + cart.items.reduce((cartSum, item) => cartSum + item.quantity, 0);
        }, 0);
        
        const totalRevenue = allCarts.reduce((sum, cart) => {
            return sum + cart.items.reduce((cartSum, item) => cartSum + (item.price * item.quantity), 0);
        }, 0);

        res.json({
            totalUsers,
            totalAdmins,
            totalCarts,
            totalItems,
            totalRevenue: totalRevenue.toFixed(2),
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

