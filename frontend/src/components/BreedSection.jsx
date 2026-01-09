import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import goldenRetrieverImg from "../assets/golden,jpg.jpg";
import siberianHuskyImg from "../assets/husky.jpg";
import pitbullImg from "../assets/pitbull.jpg";
import germanShepherdImg from "../assets/shepherd.jpg";
import pugImg from "../assets/pug.jpg";
import japaneseSpitzImg from "../assets/spitz..jpeg";
import labradorImg from "../assets/labrador.jpg";

const breeds = [
  { id: 1, name: "Golden Retriever", img: goldenRetrieverImg, price: 1200.0, slug: "golden-retriever" },
  { id: 2, name: "Siberian Husky", img: siberianHuskyImg, price: 1500.0, slug: "siberian-husky" },
  { id: 3, name: "Pitbull", img: pitbullImg, price: 1300.0, slug: "pitbull" },
  { id: 4, name: "German Shepherd", img: germanShepherdImg, price: 1800.0, slug: "german-shepherd" },
  { id: 5, name: "Pug", img: pugImg, price: 800.0, slug: "pug" },
  { id: 6, name: "Japanese Spitz", img: japaneseSpitzImg, price: 1000.0, slug: "japanese-spitz" },
  { id: 7, name: "Labrador", img: labradorImg, price: 1100.0, slug: "labrador" },
];

export default function BreedSection() {
  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();

  const handleBuyMe = async (breed) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart");
      return;
    }

    const result = await addItem({
      id: breed.id,
      name: breed.name,
      price: breed.price,
      quantity: 1,
    });

    alert(
      result.success
        ? `${breed.name} added to cart!`
        : result.message || "Failed to add to cart"
    );
  };

  return (
    <>
      <style>{`
        .breed-img-circle {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s;
        }
        .breed-img-circle:hover {
          transform: translateY(-5px);
        }
        .btn-orange-custom {
          background-color: #ff914d;
          border-color: #ff914d;
          color: white;
          border-radius: 25px;
          transition: background-color 0.3s, border-color 0.3s;
        }
        .btn-orange-custom:hover {
          background-color: #e68345;
          border-color: #e68345;
        }
      `}</style>

      <section className="container py-4 text-center">
        <h2 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "2.5rem" }}>
          Dog Breed
        </h2>
        <p className="text-dark fs-5 mt-2">
          Find yourself a perfect friend from a wide variety of choices.
        </p>

        <div className="row justify-content-center mt-5">
          {breeds.map((b) => (
            <div key={b.id} className="col-3 col-sm-3 col-md-2 text-center mb-4">
              <Link to={`/breeds/${b.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
                <img
                  src={b.img}
                  alt={b.name}
                  className="rounded-circle img-fluid breed-img-circle"
                  style={{
                    height: "140px",
                    width: "140px",
                    objectFit: "cover",
                    marginBottom: "0.5rem",
                    cursor: "pointer",
                  }}
                  onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
                  onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
                />
              </Link>

              <p className="mt-2 text-dark fw-bold">{b.name}</p>
              <p className="mb-2" style={{ color: "#ff914d", fontWeight: "bold" }}>
                Rs.{b.price.toFixed(2)}
              </p>

              <div className="d-flex gap-1 justify-content-center">
                <Link
                  to={`/breeds/${b.slug}`}
                  className="btn btn-sm"
                  style={{
                    backgroundColor: "#2c2c2c",
                    color: "white",
                    fontSize: "0.75rem",
                    padding: "0.25rem 0.5rem",
                  }}
                >
                  Details
                </Link>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleBuyMe(b);
                  }}
                  className="btn btn-sm btn-orange-custom"
                  style={{ fontSize: "0.75rem", padding: "0.25rem 0.5rem" }}
                >
                  Buy
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
