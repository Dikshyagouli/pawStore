// src/pages/PaymentSuccess.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../component/Navbar.jsx';
import Footer from '../component/footer.jsx';

const API_URL = 'http://localhost:5000/api/orders';

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();
    const orderId = searchParams.get('orderId');
    const { user } = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (orderId && user?.token) {
            fetchOrder();
        }
    }, [orderId, user]);

    const fetchOrder = async () => {
        try {
            const response = await fetch(`${API_URL}/${orderId}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                },
            });

            if (response.ok) {
                const data = await response.json();
                setOrder(data);
            }
        } catch (error) {
            console.error('Error fetching order:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm text-center">
                            <div className="card-body py-5">
                                <div className="mb-4">
                                    <i className="bi bi-check-circle-fill" style={{ fontSize: '5rem', color: '#28a745' }}></i>
                                </div>
                                <h2 className="mb-3" style={{ color: '#2c2c2c' }}>Payment Successful!</h2>
                                <p className="text-muted mb-4">
                                    Thank you for your purchase. Your order has been placed successfully.
                                </p>
                                
                                {order && (
                                    <div className="text-start mb-4 p-3" style={{ backgroundColor: '#f8f9fa', borderRadius: '8px' }}>
                                        <h5 className="mb-3">Order Details</h5>
                                        <p><strong>Order ID:</strong> {order._id}</p>
                                        <p><strong>Total Amount:</strong> <span style={{ color: '#ff914d' }}>${order.totalAmount.toFixed(2)}</span></p>
                                        <p><strong>Payment Status:</strong> <span className="badge bg-success">{order.paymentStatus}</span></p>
                                        <p><strong>Order Status:</strong> <span className="badge bg-info">{order.orderStatus}</span></p>
                                    </div>
                                )}

                                <div className="d-flex gap-3 justify-content-center">
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: '#ff914d', color: 'white' }}
                                        onClick={() => navigate('/')}
                                    >
                                        Continue Shopping
                                    </button>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/profile')}
                                    >
                                        View Orders
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

