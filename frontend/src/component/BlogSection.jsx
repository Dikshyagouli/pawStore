import React from "react";
import blog1 from "../assets/blog1.jpg";
import blog2 from "../assets/blog2.jpg";
import blog3 from "../assets/blog3.jpg";
import blog4 from "../assets/blog4.jpg";

const blogs = [
  { img: blog1, text: "Are you having trouble finding the right dog?" },
  { img: blog2, text: "Is your dog aggressive towards your kids?" },
  { img: blog3, text: "Looking for someone to train your dog?" },
  { img: blog4, text: "Choose the most stylist and durable products for your dog." },
];

export default function BlogSection() {
  return (
    <>
      <style>{`
        .blog-card {
          border-radius: 1rem !important;
          border: none;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
        }
        .blog-card .card-text {
          font-size: 1rem;
          font-weight: 500;
          color: #2c2c2c;
          padding: 0 1rem;
        }
        .blog-card .card-img-top {
          border-top-left-radius: 1rem !important;
          border-top-right-radius: 1rem !important;
          height: 180px;
          object-fit: cover;
        }
      `}</style>

      <section className="container py-5 text-center">
        <h2 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "2.5rem" }}>
          Blog Section
        </h2>
        <p className="fs-5 mt-2" style={{ color: "#2c2c2c" }}>
          Get the latest information, advice, and tips.
        </p>

        <div className="row gy-4 mt-4">
          {blogs.map((blog, index) => (
            <div key={index} className="col-md-3">
              <div className="card blog-card h-100">
                <img src={blog.img} className="card-img-top" alt="blog" />
                <div className="card-body d-flex align-items-center justify-content-center">
                  <p className="card-text">{blog.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
