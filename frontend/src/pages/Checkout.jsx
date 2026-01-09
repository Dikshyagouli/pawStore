import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const API_URL = 'http://localhost:5000/api/orders';

export default function Checkout() {
    const { cartItems } = useCart();
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('esewa');
    
    const [shippingAddress, setShippingAddress] = useState({
        name: user?.name || '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
    });

    React.useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login');
        }
    }, [isLoggedIn, navigate]);

    if (!isLoggedIn) {
        return null;
    }

    const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const tax = 0;
    const total = subtotal + tax;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    shippingAddress,
                    paymentMethod,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                if (paymentMethod === 'esewa' && data.esewaData) {
                    submitEsewaForm(data.esewaData);
                } else {
                    navigate(`/payment-success?orderId=${data.order._id}`);
                }
            } else {
                alert(`Checkout failed: ${data.message}`);
                setLoading(false);
            }
        } catch (error) {
            console.error('Checkout error:', error);
            alert('Checkout failed. Please try again.');
            setLoading(false);
        }
    };

    const submitEsewaForm = (esewaData) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = esewaData.url;
        form.style.display = 'none';

        Object.keys(esewaData.formData).forEach(key => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = esewaData.formData[key];
            form.appendChild(input);
        });

        document.body.appendChild(form);
        form.submit();
    };

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <h2 className="mb-4" style={{ color: '#2c2c2c' }}>Checkout</h2>
                
                <div className="row">
                    <div className="col-lg-8">
                        <div className="card shadow-sm mb-4">
                            <div className="card-header bg-white">
                                <h5 className="mb-0" style={{ color: '#2c2c2c' }}>
                                    Shipping Information
                                </h5>
                            </div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label className="form-label">Full Name </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            value={shippingAddress.name}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Phone Number </label>
                                        <input
                                            type="tel"
                                            className="form-control"
                                            value={shippingAddress.phone}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label className="form-label">Address </label>
                                        <textarea
                                            className="form-control"
                                            rows="3"
                                            value={shippingAddress.address}
                                            onChange={(e) => setShippingAddress({ ...shippingAddress, address: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col-md-6 mb-3">
                                            <label className="form-label">City </label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                value={shippingAddress.city}
                                                onChange={(e) => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="mb-4">
                                        <label className="form-label fw-bold">Payment Method *</label>
                                        <div className="mt-2">
                                            <div className="form-check mb-2">
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="paymentMethod"
                                                    id="esewa"
                                                    value="esewa"
                                                    checked={paymentMethod === 'esewa'}
                                                    onChange={(e) => setPaymentMethod(e.target.value)}
                                                />
                                                <label className="form-check-label" htmlFor="esewa">
                                                    <img 
                                                        src="https://esewa.com.np/common/images/esewa_logo.png" 
                                                        alt="eSewa" 
                                                        style={{ height: '30px', marginLeft: '10px' }}
                                                    />
                                                    eSewa (Online Payment)
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn w-100"
                                        style={{ backgroundColor: '#ff914d', color: 'white' }}
                                        disabled={loading}
                                    >
                                        {loading ? 'Processing...' : paymentMethod === 'esewa' ? 'Proceed to eSewa Payment' : 'Place Order'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-4">
                        <div className="card shadow-sm sticky-top" style={{ top: '20px' }}>
                            <div className="card-header bg-white">
                                <h5 className="mb-0" style={{ color: '#2c2c2c' }}>Order Summary</h5>
                            </div>
                            <div className="card-body">
                                <div className="mb-3">
                                    {cartItems.map((item) => (
                                        <div key={item._id || item.productId} className="d-flex justify-content-between mb-2">
                                            <div>
                                                <small>{item.name}</small>
                                                <br />
                                                <small className="text-muted">Qty: {item.quantity}</small>
                                            </div>
                                            <small>Rs.{(item.price * item.quantity).toFixed(2)}</small>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Subtotal:</span>
                                    <span>Rs.{subtotal.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Tax:</span>
                                    <span>Rs.{tax.toFixed(2)}</span>
                                </div>
                                <hr />
                                <div className="d-flex justify-content-between fw-bold">
                                    <span>Total:</span>
                                    <span style={{ color: '#ff914d' }}>${total.toFixed(2)}</span>
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

