// src/pages/Profile.jsx
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { useCart } from '../context/CartContext.jsx';
import Navbar from '../component/Navbar.jsx';
import Footer from '../component/footer.jsx';

export default function Profile() {
    const { user, isLoggedIn } = useAuth();
    const { cartItems, totalQuantity } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn || !user) {
        return null; // Will redirect
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h2 className="mb-4" style={{ color: '#2c2c2c' }}>My Profile</h2>
                
                <div className="row">
                    {/* User Information Card */}
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h4 className="card-title mb-4" style={{ color: '#ff914d' }}>
                                    <i className="bi bi-person-circle me-2"></i>
                                    Account Information
                                </h4>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Name:</label>
                                    <p className="form-control-plaintext">{user.name}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Email:</label>
                                    <p className="form-control-plaintext">{user.email}</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">User ID:</label>
                                    <p className="form-control-plaintext text-muted small">{user._id}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Cart Summary Card */}
                    <div className="col-lg-6 mb-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h4 className="card-title mb-4" style={{ color: '#ff914d' }}>
                                    <i className="bi bi-bag me-2"></i>
                                    Cart Summary
                                </h4>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Items in Cart:</label>
                                    <p className="form-control-plaintext">{totalQuantity} item(s)</p>
                                </div>
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Cart Total:</label>
                                    <p className="form-control-plaintext fs-5" style={{ color: '#ff914d' }}>
                                        ${subtotal.toFixed(2)}
                                    </p>
                                </div>
                                {cartItems.length > 0 && (
                                    <button 
                                        className="btn w-100 mt-3" 
                                        style={{ backgroundColor: '#ff914d', color: 'white' }}
                                        onClick={() => navigate('/cart')}
                                    >
                                        View Cart
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Recent Cart Items */}
                {cartItems.length > 0 && (
                    <div className="row mt-4">
                        <div className="col-12">
                            <div className="card shadow-sm">
                                <div className="card-body">
                                    <h4 className="card-title mb-4" style={{ color: '#ff914d' }}>
                                        <i className="bi bi-cart me-2"></i>
                                        Your Cart Items
                                    </h4>
                                    <div className="table-responsive">
                                        <table className="table table-hover">
                                            <thead>
                                                <tr>
                                                    <th>Product</th>
                                                    <th>Price</th>
                                                    <th>Quantity</th>
                                                    <th>Total</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {cartItems.map((item) => (
                                                    <tr key={item._id || item.productId}>
                                                        <td>{item.name}</td>
                                                        <td>${item.price.toFixed(2)}</td>
                                                        <td>{item.quantity}</td>
                                                        <td style={{ color: '#ff914d', fontWeight: 'bold' }}>
                                                            ${(item.price * item.quantity).toFixed(2)}
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <Footer />
        </>
    );
}

