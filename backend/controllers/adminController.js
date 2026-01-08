import Cart from '../models/Cart.js';
import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

export const getAllCarts = async (req, res) => {
    try {
        const carts = await Cart.find({})
            .populate('user', 'name email _id')
            .sort({ createdAt: -1 });

        const cartsWithUsers = carts.map(cart => {
            // Handle case where user might be null (deleted user)
            const userInfo = cart.user ? {
                _id: cart.user._id,
                name: cart.user.name,
                email: cart.user.email,
            } : {
                _id: 'Deleted User',
                name: 'Unknown User',
                email: 'N/A',
            };

            return {
                _id: cart._id,
                user: userInfo,
                items: cart.items || [],
                itemCount: cart.items ? cart.items.reduce((sum, item) => sum + (item.quantity || 0), 0) : 0,
                totalValue: cart.items ? cart.items.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 0)), 0) : 0,
                createdAt: cart.createdAt,
                updatedAt: cart.updatedAt,
            };
        });

        res.json(cartsWithUsers);
    } catch (error) {
        console.error('Error fetching carts:', error);
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

        // Calculate revenue from orders
        const allOrders = await Order.find({ paymentStatus: 'paid' });
        const orderRevenue = allOrders.reduce((sum, order) => sum + order.totalAmount, 0);

        res.json({
            totalUsers,
            totalAdmins,
            totalCarts,
            totalItems,
            totalRevenue: orderRevenue.toFixed(2),
            totalOrders: allOrders.length,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/admin/all-orders
// @desc    Get all orders (Admin only)
// @access  Private/Admin
export const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('user', 'name email _id')
            .sort({ createdAt: -1 });
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   PUT /api/admin/orders/:id/status
// @desc    Update order status (Admin only)
// @access  Private/Admin
export const updateOrderStatus = async (req, res) => {
    try {
        const { orderStatus } = req.body;
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        order.orderStatus = orderStatus;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/admin/products
// @desc    Get all products (Admin only)
// @access  Private/Admin
export const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({}).sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   POST /api/admin/products
// @desc    Create new product (Admin only)
// @access  Private/Admin
export const createProduct = async (req, res) => {
    try {
        const { name, description, price, category, image, stock } = req.body;

        const product = await Product.create({
            name,
            description,
            price,
            category,
            image,
            stock: stock || 0,
        });

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   PUT /api/admin/products/:id
// @desc    Update product (Admin only)
// @access  Private/Admin
export const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const { name, description, price, category, image, stock, isActive } = req.body;

        if (name) product.name = name;
        if (description !== undefined) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (image) product.image = image;
        if (stock !== undefined) product.stock = stock;
        if (isActive !== undefined) product.isActive = isActive;

        await product.save();
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   DELETE /api/admin/products/:id
// @desc    Delete product (Admin only)
// @access  Private/Admin
export const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @route   GET /api/admin/analytics
// @desc    Get analytics and reports (Admin only)
// @access  Private/Admin
export const getAnalytics = async (req, res) => {
    try {
        const orders = await Order.find({ paymentStatus: 'paid' })
            .populate('user', 'name email');

        const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
        const totalOrders = orders.length;
        const totalProducts = await Product.countDocuments();

        // Revenue by month
        const revenueByMonth = {};
        orders.forEach(order => {
            const month = new Date(order.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' });
            revenueByMonth[month] = (revenueByMonth[month] || 0) + order.totalAmount;
        });

        // Top selling products (from orders)
        const productSales = {};
        orders.forEach(order => {
            order.items.forEach(item => {
                productSales[item.name] = (productSales[item.name] || 0) + item.quantity;
            });
        });

        const topProducts = Object.entries(productSales)
            .map(([name, quantity]) => ({ name, quantity }))
            .sort((a, b) => b.quantity - a.quantity)
            .slice(0, 10);

        res.json({
            totalRevenue: totalRevenue.toFixed(2),
            totalOrders,
            totalProducts,
            revenueByMonth,
            topProducts,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

