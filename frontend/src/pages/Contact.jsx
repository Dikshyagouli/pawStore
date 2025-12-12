import React from 'react';
import Navbar from '../component/Navbar'; 
import Footer from '../component/Footer'; 

export default function Contact() {
    return (
        <>
            <Navbar />

            {/* Contact Page Content */}
            <div className="container py-5">
                
                {/* Header */}
                <header className="text-center mb-5">
                    <h1 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "3rem" }}>
                        Get In Touch
                    </h1>
                    <p className="fs-5 mt-3" style={{ color: "#ff914d" }}>
                        We're here to help you and your furry friend.
                    </p>
                </header>
                
                <div className="row g-5 justify-content-center">
                    
                    {/* LEFT COLUMN: Contact Form (6/12 width) */}
                    <div className="col-lg-6">
                        <div className="card shadow-sm p-4 border-0" style={{ borderRadius: "1rem" }}>
                            <h4 className="fw-bold mb-4" style={{ color: "#2c2c2c" }}>Send us a message</h4>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Full Name</label>
                                    <input type="text" className="form-control" id="name" style={{ borderRadius: "0.5rem", backgroundColor: "#ffe8da" }} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input type="email" className="form-control" id="email" style={{ borderRadius: "0.5rem", backgroundColor: "#ffe8da" }} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="subject" className="form-label">Subject</label>
                                    <input type="text" className="form-control" id="subject" style={{ borderRadius: "0.5rem", backgroundColor: "#ffe8da" }} required />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea className="form-control" id="message" rows="4" style={{ borderRadius: "0.5rem", backgroundColor: "#ffe8da" }} required></textarea>
                                </div>
                                
                                {/* Submit button using the custom orange style */}
                                <button type="submit" className="btn btn-orange-custom px-4 py-2 fw-bold w-100">
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Contact Information (4/12 width) */}
                    <div className="col-lg-4">
                        <div className="bg-light p-4" style={{ borderRadius: "1rem" }}>
                            <h4 className="fw-bold mb-4" style={{ color: "#ff914d" }}>Our Details</h4>
                            
                            <div className="d-flex align-items-start mb-3">
                                <i className="bi bi-geo-alt-fill me-3 fs-5" style={{ color: "#ff914d" }}></i>
                                <div>
                                    <p className="fw-bold mb-0">Location</p>
                                    <p className="text-muted small">Mahendrapool, Pokhara, Nepal</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-start mb-3">
                                <i className="bi bi-envelope-fill me-3 fs-5" style={{ color: "#ff914d" }}></i>
                                <div>
                                    <p className="fw-bold mb-0">Email Us</p>
                                    <p className="text-muted small">support@pawstore.com</p>
                                </div>
                            </div>

                            <div className="d-flex align-items-start mb-3">
                                <i className="bi bi-telephone-fill me-3 fs-5" style={{ color: "#ff914d" }}></i>
                                <div>
                                    <p className="fw-bold mb-0">Call Us</p>
                                    <p className="text-muted small">+977- (0)61- 328463</p>
                                </div>
                            </div>
                            
                            <hr/>
                            
                            {/* Social Media Icons (Consistent with Footer) */}
                            <h5 className="fw-bold mt-4" style={{ color: "#2c2c2c" }}>Follow Us</h5>
                            <div>
                                <a href="#" className="social-icon-link" aria-label="Facebook"><i className="bi bi-facebook fs-4 me-3" style={{ color: "#ff914d" }}></i></a>
                                <a href="#" className="social-icon-link" aria-label="Instagram"><i className="bi bi-instagram fs-4 me-3" style={{ color: "#ff914d" }}></i></a>
                                <a href="#" className="social-icon-link" aria-label="YouTube"><i className="bi bi-youtube fs-4" style={{ color: "#ff914d" }}></i></a>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}