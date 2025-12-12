import React from "react";
import goldenRetrieverImg from "../assets/golden,jpg.jpg";
import siberianHuskyImg from "../assets/husky.jpg";
import pitbullImg from "../assets/pitbull.jpg";
import germanShepherdImg from "../assets/shepherd.jpg";
import pugImg from "../assets/pug.jpg";
import japaneseSpitzImg from "../assets/spitz..jpeg";
import labradorImg from "../assets/labrador.jpg";


const breeds = [
  { name: "Golden Retriever", img: goldenRetrieverImg },
  { name: "Siberian Husky", img: siberianHuskyImg },
  { name: "Pitbull", img: pitbullImg },
  { name: "German Shepherd", img: germanShepherdImg },
  { name: "Pug", img: pugImg },
  { name: "Japanese Spitz", img: japaneseSpitzImg },
  { name: "Labrador", img: labradorImg },
];

export default function BreedSection() {
  return (
    // Adjust py-5 to py-4 for a bit less vertical space and ensure alignment
    <section className="container py-4 text-center">
      {/* 1. Title: Bold and dark text */}
      <h2 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "2.5rem" }}>
        Dog Breed
      </h2>
      {/* 2. Subtitle: Updated text to match the image */}
      <p className="text-dark fs-5 mt-2">
        Find yourself a perfect freind from a wide variety of choices.
      </p>

      {/* Dog Breed Circles */}
      <div className="row justify-content-center mt-5">
        {breeds.map((b, i) => (
          // Adjusted column spacing to fit 7 items reasonably on larger screens
          <div key={i} className="col-3 col-sm-3 col-md-2 text-center mb-4">
            <img
              src={b.img}
              // Added the new CSS class for shadow
              className="rounded-circle img-fluid breed-img-circle"
              alt={b.name}
              style={{ 
                height: "140px", 
                width: "140px", 
                objectFit: "cover",
                marginBottom: "0.5rem" // Small margin for spacing
              }}
            />
            {/* Breed Name: Ensure dark text color */}
            <p className="mt-2 text-dark fw-bold">{b.name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}