import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="container-fluid py-5"
      style={{ background: "#f7f9fc", borderTop: "1px solid #e1e8ed" }}
    >
      <div className="container">
        <div className="row">

          <div className="col-md-4">
            <h3 className="mb-4" style={{ color: "#2c2c2c" }}>Menu</h3>
            <ul className="list-unstyled fs-5">
              <li className="mb-3">
                <Link to="/" className="text-decoration-none text-dark hover-orange">Home</Link>
              </li>
              <li className="mb-3">
                <Link to="/breeds" className="text-decoration-none text-dark hover-orange">Breeds</Link>
              </li>
              <li className="mb-3">
                <Link to="/accessories" className="text-decoration-none text-dark hover-orange">Accessories</Link>
              </li>
              <li className="mb-3">
                <Link to="/blog" className="text-decoration-none text-dark hover-orange">Blog</Link>
              </li>
              <li className="mb-3">
                <Link to="/contact" className="text-decoration-none text-dark hover-orange">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="col-md-4">
            <h3 className="mb-4" style={{ color: "#2c2c2c" }}>Contact</h3>
            <p className="fs-5 mb-3">
              <i className="bi bi-geo-alt-fill me-2" style={{ color: "#ff914d" }}></i>
              Mahendrapool, Pokhara, Nepal
            </p>
            <p className="fs-5 mb-3">
              <i className="bi bi-telephone-fill me-2" style={{ color: "#ff914d" }}></i>
              +977-(0)61-328463
            </p>
            <p className="fs-5">
              <i className="bi bi-envelope-fill me-2" style={{ color: "#ff914d" }}></i>
              support@pawstore.com
            </p>
          </div>
          <div className="col-md-4">
            <h3 className="mb-4" style={{ color: "#2c2c2c" }}>Find Us</h3>
            <div className="rounded shadow-sm" style={{ overflow: "hidden", border: "1px solid #ddd" }}>
              <iframe
                title="map"
                width="100%"
                height="220"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3515.827367352825!2d83.9855!3d28.22!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399594595e64032f%3A0x63359d95f87b32a1!2sMahendra%20Pool%2C%20Pokhara!5e0!3m2!1sen!2snp!4v1700000000000"
              ></iframe>
            </div>
          </div>
        </div>
        
        <hr className="my-5" />
        
        <div className="text-center text-muted">
          <p className="mb-0">© {new Date().getFullYear()} PawStore. All rights reserved.</p>
        </div>
      </div>

      <style px-scope>{`
        .hover-orange:hover {
          color: #ff914d !important;
          padding-left: 5px;
          transition: 0.3s;
        }
      `}</style>
    </footer>
  );
}