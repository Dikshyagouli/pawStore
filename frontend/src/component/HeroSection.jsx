import React from "react";
import heroSectionimg from "../assets/herosecton.jpg";

export default function HeroSection() {
  return (
    // Use the new hero-section class for layout and background
    <section className="container-fluid py-5 hero-section">
      <div className="container">
        {/* Bootstrap utility classes for layout */}
        <div className="row align-items-center">
          {/* Image Column */}
          <div className="col-md-6 text-center mb-4 mb-md-0 order-md-1">
            <img
              src={heroSectionimg}
              // Use Bootstrap classes for styling the image
              className="img-fluid rounded-circle shadow-lg"
              alt="dog"
              style={{ maxHeight: "400px", width: "auto" }}
            />
            {/* The text below the image */}
            <p className="mt-3 text-dark d-flex justify-content-center align-items-center">
              <i className="bi bi-arrow-left me-2"></i>
              Corgi (2 months)
              <i className="bi bi-arrow-right ms-2"></i>
            </p>
          </div>

          {/* Text Content Column */}
          {/* Use the new hero-text class for dark text color */}
          <div className="col-md-6 text-md-start text-center order-md-2 hero-text">
            <h1 className="fw-bolder" style={{ fontSize: "3.5em", lineHeight: "1.2" }}>
              Everybody Needs A Friend In Life.
            </h1>
            <p className="mt-3 fs-5">
              The Corgi is intelligent, quick and curious. It is a kind,
              adventurous breed which shows a large measure of independence. They
              are good with children and normally kind with strangers.
            </p>
            {/* Use the new btn-buy-me class for custom button style */}
            <button className="btn mt-4 px-5 py-3 fw-bold btn-buy-me">
              Buy Me
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}