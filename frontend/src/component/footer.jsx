import React from "react";

export default function Footer() {
  return (
    <footer
      className="container-fluid py-5"
      style={{ background: "#f7f9fc" }}
    >
      <div className="container">
        <div className="row">

          {/* LEFT SIDE — Menu */}
          <div className="col-md-4">
            <ul className="list-unstyled fs-5">
              <li className="mb-3"><a href="#">Home</a></li>
              <li className="mb-3"><a href="#">About</a></li>
              <li className="mb-3"><a href="#">Services</a></li>
              <li className="mb-3"><a href="#">Team</a></li>
              <li className="mb-3"><a href="#">FAQs</a></li>
              <li className="mb-3"><a href="#">Careers</a></li>
              <li className="mb-3"><a href="#">Contact Us</a></li>
            </ul>
          </div>

          {/* MIDDLE — CONTACT DETAILS */}
          <div className="col-md-4">
            <h3 className="mb-4">Contact</h3>

            <p className="fs-5 mb-3">Mahendrapool</p>
            <p className="fs-5 mb-3">Pokhara, Nepal</p>
            <p className="fs-5">+977-(0)61-328463</p>
          </div>

          {/* RIGHT SIDE — MAP */}
          <div className="col-md-4">
            <div className="rounded" style={{ overflow: "hidden" }}>
              <iframe
                title="map"
                width="100%"
                height="260"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d113660.16855908194!2d83.87421692040662!3d28.2296977061199!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3995937bbf0376ff%3A0xf6cf823b25802164!2sPokhara!5e1!3m2!1sen!2snp!4v1765447188366!5m2!1sen!2snp"></iframe>
            </div>
          </div>

        </div>

        {/* BOTTOM ROW */}
        <div className="row text-center mt-5">
          <div className="col-md-6 fs-6 text-muted">
            Copyright © 2021 GrandmaBakery
          </div>
          <div className="col-md-6 fs-6 text-muted">
            Created by Brandbuilder
          </div>
        </div>
      </div>
    </footer>
  );
}
