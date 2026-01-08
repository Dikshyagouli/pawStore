import React from "react";
import prod1 from "../assets/prod1.jpg";
import prod2 from "../assets/prod2.jpg";
import prod3 from "../assets/prod3.jpg";
import prod4 from "../assets/prod4.jpg";
import prod5 from "../assets/prod5.jpg";
import prod6 from "../assets/prod6.jpg";

export default function PetProducts() {
  const productImages = [
    { src: prod1, alt: "Dog with toy" },
    { src: prod2, alt: "Dog playing fetch" },
    { src: prod3, alt: "Small dog with toys" },
    { src: prod4, alt: "Donut treats" },
    { src: prod5, alt: "Canned pet food" },
    { src: prod6, alt: "Pug with rope toy" },
  ];

  return (
    <section className="container py-5">
      <div className="row align-items-center">
        <div className="col-md-5 mb-5 mb-md-0 text-center text-md-start"> 
          
          <h2 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "2.5rem" }}>
            Pet Products
          </h2>
          <p className="fs-5 mt-3" style={{ color: "#2c2c2c" }}>
            All products are designed for ease of use and **durable**, as well as looking good. You can choose your own colours to make your item unique.
          </p>

          <a href="/accessories"> 
            <button 
              className="btn mt-4 px-5 py-3 fw-bold btn-orange-custom"
            >
              See more
            </button>
          </a>
        </div>

        <div className="col-md-7">
          <div className="row g-3">
            {productImages.map((prod, index) => (
              <div key={index} className="col-4"> 
                <img 
                  src={prod.src} 
                  className="img-fluid rounded shadow-sm w-100" 
                  alt={prod.alt} 
                  style={{ height: "200px", objectFit: "cover" }} 
                />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}