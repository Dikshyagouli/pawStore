// src/pages/Cart.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx'; 
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../component/Navbar.jsx';

export default function Cart() {
    const { 
        cartItems, 
        removeItem, 
        increaseQuantity, 
        decreaseQuantity,
        loading
    } = useCart();
    const { isLoggedIn } = useAuth();
    const navigate = useNavigate();

    // Redirect to login if not logged in
    React.useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null; // Will redirect
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    
    if (loading) {
        return (
            <>
                <Navbar />
                <div className="container py-5 text-center">
                    <p>Loading cart...</p>
                </div>
            </>
        );
    }

    if (cartItems.length === 0) {
        return (
            <>
                <Navbar />
                <div className="container py-5 text-center">
                    <h3 className="mb-3">Your Cart is Empty 🐾</h3>
                    <p>Browse our beautiful breeds and accessories to get started!</p>
                </div>
            </>
        );
    }

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h2 className="mb-4" style={{ color: '#2c2c2c' }}>Shopping Cart ({cartItems.length} items)</h2>
                <div className="row">
                    {/* Cart Items List */}
                    <div className="col-lg-8">
                        {cartItems.map((item) => (
                            <div key={item._id || item.productId} className="d-flex align-items-center justify-content-between p-3 mb-3 border rounded shadow-sm">
                                <div className="d-flex align-items-center">
                                    {/* Product Info */}
                                    <div>
                                        <h5 className="mb-0">{item.name}</h5>
                                        <p className="text-muted small mb-1">Price: ${item.price.toFixed(2)}</p>
                                        <p className="fw-bold mb-0" style={{ color: '#ff914d' }}>
                                            Total: ${(item.price * item.quantity).toFixed(2)}
                                        </p>
                                    </div>
                                </div>
                                
                                {/* Quantity Controls */}
                                <div className="d-flex align-items-center">
                                    <button 
                                        className="btn btn-sm btn-outline-secondary me-2"
                                        onClick={() => decreaseQuantity(item._id || item.productId)}
                                        aria-label="Decrease quantity"
                                    >
                                        -
                                    </button>
                                    <span className="mx-2">{item.quantity}</span>
                                    <button 
                                        className="btn btn-sm btn-outline-secondary"
                                        onClick={() => increaseQuantity(item._id || item.productId)}
                                        aria-label="Increase quantity"
                                    >
                                        +
                                    </button>
                                </div>

                                {/* Remove Button */}
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => removeItem(item._id || item.productId)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>

                    {/* Summary Card */}
                    <div className="col-lg-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h4 className="card-title mb-3">Order Summary</h4>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>${subtotal.toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-4 fw-bold">
                                    <span>Order Total:</span>
                                    <span style={{ color: '#ff914d' }}>${subtotal.toFixed(2)}</span>
                                </div>
                                <button 
                                    className="btn w-100" 
                                    style={{ backgroundColor: '#ff914d', color: 'white' }}
                                    onClick={() => navigate('/checkout')}
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}