import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Navbar from '../../component/Navbar.jsx';
import Footer from '../../component/Footer.jsx';

const API_URL = 'http://localhost:5000/api/admin';

export default function OrderManagement() {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await fetch(`${API_URL}/all-orders`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setOrders(data);
            }
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (orderId, newStatus) => {
        try {
            const response = await fetch(`${API_URL}/orders/${orderId}/status`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderStatus: newStatus }),
            });

            if (response.ok) {
                fetchOrders();
            }
        } catch (error) {
            console.error('Error updating order status:', error);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h2 className="mb-4" style={{ color: '#2c2c2c' }}>
                    Order Management
                </h2>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status"></div>
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Customer</th>
                                    <th>Items</th>
                                    <th>Amount</th>
                                    <th>Payment</th>
                                    <th>Status</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order._id}>
                                        <td><small>{order._id.slice(-8)}</small></td>
                                        <td>
                                            <div>
                                                <strong>{order.user?.name || 'N/A'}</strong>
                                                <br />
                                                <small className="text-muted">{order.user?.email}</small>
                                            </div>
                                        </td>
                                        <td>
                                            {order.items.map((item, idx) => (
                                                <div key={idx} className="mb-1">
                                                    <small>{item.name} (x{item.quantity})</small>
                                                </div>
                                            ))}
                                        </td>
                                        <td>${order.totalAmount.toFixed(2)}</td>
                                        <td>
                                            {order.paymentStatus === 'paid' ? (
                                                <span className="badge bg-success">Paid</span>
                                            ) : (
                                                <span className="badge bg-warning">{order.paymentStatus}</span>
                                            )}
                                        </td>
                                        <td>
                                            <select
                                                className="form-select form-select-sm"
                                                value={order.orderStatus}
                                                onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="processing">Processing</option>
                                                <option value="shipped">Shipped</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                        <td><small>{new Date(order.createdAt).toLocaleDateString()}</small></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}


