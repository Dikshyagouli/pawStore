import React from "react";
import dogImg from "../assets/newsletter_dog.jpg";

export default function NewsletterSection() {
  return (
    <section >
  <div className="container">
    <div className="newsletter-outer1">
    <div className="row align-items-center">

      <div className="col-md-6 text-center">
        <img src={dogImg} alt="Dog" className="newsletter-dog" />
      </div>

      <div className="col-md-6 text-center text-md-start">
        <h2 className="newsletter-title">Get Pawsome News!</h2>
        <p className="newsletter-desc">
          Exclusive training tips, ticks, product deals and more.
        </p>

        <form className="newsletter-form d-flex flex-column flex-sm-row">
          <input
            type="email"
            placeholder="Enter email..."
            className="newsletter-input me-sm-3 mb-3 mb-sm-0"
            required
          />
          <button type="submit" className="newsletter-btn">
            Subscribe
          </button>
        </form>
      </div>

    </div>
    </div>
  </div>
</section>

  );
}
