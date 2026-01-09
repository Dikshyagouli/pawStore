import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

export default function PaymentFailure() {
    const navigate = useNavigate();

    return (
        <>
            <Navbar />
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-md-8">
                        <div className="card shadow-sm text-center">
                            <div className="card-body py-5">
                                <div className="mb-4">
                                    <i className="bi bi-x-circle-fill" style={{ fontSize: '5rem', color: '#dc3545' }}></i>
                                </div>
                                <h2 className="mb-3" style={{ color: '#2c2c2c' }}>Payment Failed</h2>
                                <p className="text-muted mb-4">
                                    Unfortunately, your payment could not be processed. Please try again.
                                </p>

                                <div className="d-flex gap-3 justify-content-center">
                                    <button
                                        className="btn"
                                        style={{ backgroundColor: '#ff914d', color: 'white' }}
                                        onClick={() => navigate('/cart')}
                                    >
                                        Back to Cart
                                    </button>
                                    <button
                                        className="btn btn-outline-secondary"
                                        onClick={() => navigate('/')}
                                    >
                                        Continue Shopping
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

