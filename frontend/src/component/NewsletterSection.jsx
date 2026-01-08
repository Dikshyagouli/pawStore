import React from "react";
import dogImg from "../assets/newsletter_dog.jpg";

export default function NewsletterSection() {
  return (
    <>
      <style>{`
        .newsletter-outer1 {
          background-color: #eac490;
          border-radius: 40px;
          padding: 4rem;
          margin: 3rem auto;
          width: 90%;
        }
        .newsletter-box {
          padding: 1rem;
        }
        .newsletter-dog {
          max-width: 260px;
          border-radius: 1.2rem;
          object-fit: contain;
        }
        .newsletter-title {
          font-size: 2.8rem;
          font-weight: 800;
          color: #1c1b1b;
        }
        .newsletter-desc {
          font-size: 1.3rem;
          color: #2c2c2c;
        }
        .newsletter-input {
          width: 100%;
          padding: 1rem 1.5rem;
          border-radius: 40px;
          border: none;
          background-color: #ffffffcc;
          font-size: 1rem;
        }
        .newsletter-btn {
          background: #f7941d;
          color: #fff;
          padding: 1rem 2.5rem;
          border-radius: 40px;
          border: none;
          font-weight: 700;
          font-size: 1.1rem;
        }
        .newsletter-btn:hover {
          background: #e58314;
        }
      `}</style>

      <section>
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

                <form className="d-flex flex-column flex-sm-row">
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
    </>
  );
}
