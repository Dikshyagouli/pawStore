import React from "react";
// Image imports remain the same
import prod1 from "../assets/prod1.jpg";
import prod2 from "../assets/prod2.jpg";
import prod3 from "../assets/prod3.jpg";
import prod4 from "../assets/prod4.jpg";
import prod5 from "../assets/prod5.jpg";
import prod6 from "../assets/prod6.jpg";

export default function PetProducts() {
  // Array of images to map over for the 2x3 grid
  const productImages = [
    { src: prod1, alt: "Dog with toy" },
    { src: prod2, alt: "Dog playing fetch" },
    { src: prod3, alt: "Small dog with toys" },
    { src: prod4, alt: "Donut treats" },
    { src: prod5, alt: "Canned pet food" },
    { src: prod6, alt: "Pug with rope toy" },
  ];

  return (
    // Use padding for vertical spacing
    <section className="container py-5">
      <div className="row align-items-center">
        
        {/* LEFT COLUMN: Text Content and Button (Approx 5/12 width) */}
        {/* Adjusted class to ensure column order is correct on mobile and text is centered/left aligned */}
        <div className="col-md-5 mb-5 mb-md-0 text-center text-md-start"> 
          
          {/* Title and Description */}
          <h2 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "2.5rem" }}>
            Pet Products
          </h2>
          <p className="fs-5 mt-3" style={{ color: "#2c2c2c" }}>
            All products are designed for ease of use and **durable**, as well as looking good. You can choose your own colours to make your item unique.
          </p>

          {/* Corrected Link */}
          {/* Assuming you have a route set up like /accessories or /products */}
          <a href="/accessories"> 
            <button 
              className="btn mt-4 px-5 py-3 fw-bold btn-orange-custom"
            >
              See more
            </button>
          </a>
        </div>

        {/* RIGHT COLUMN: Image Grid (Approx 7/12 width) */}
        <div className="col-md-7">
          {/* Use g-3 for slightly more grid spacing */}
          <div className="row g-3">
            {productImages.map((prod, index) => (
              // Each image now takes 4 columns (1/3 of the space), creating a 3-column grid (3 x 4 = 12)
              // This gives you the 2 rows of 3 images (2x3 grid) you likely intended.
              <div key={index} className="col-4"> 
                <img 
                  src={prod.src} 
                  className="img-fluid rounded shadow-sm w-100" 
                  alt={prod.alt} 
                  // Fixed height ensures the grid is symmetrical
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