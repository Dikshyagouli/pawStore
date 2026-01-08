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
  { id: 1, name: "Golden Retriever", img: goldenRetrieverImg, price: 1200.00, slug: "golden-retriever" },
  { id: 2, name: "Siberian Husky", img: siberianHuskyImg, price: 1500.00, slug: "siberian-husky" },
  { id: 3, name: "Pitbull", img: pitbullImg, price: 1300.00, slug: "pitbull" },
  { id: 4, name: "German Shepherd", img: germanShepherdImg, price: 1800.00, slug: "german-shepherd" },
  { id: 5, name: "Pug", img: pugImg, price: 800.00, slug: "pug" },
  { id: 6, name: "Japanese Spitz", img: japaneseSpitzImg, price: 1000.00, slug: "japanese-spitz" },
  { id: 7, name: "Labrador", img: labradorImg, price: 1100.00, slug: "labrador" },
];

export default function BreedSection() {
  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();

  const handleBuyMe = async (breed) => {
    if (!isLoggedIn) {
      alert('Please login to add items to cart');
      return;
    }

    const itemToAdd = {
      id: breed.id,
      name: breed.name,
      price: breed.price,
      quantity: 1,
    };

    const result = await addItem(itemToAdd);
    if (result.success) {
      alert(`${breed.name} added to cart!`);
    } else {
      alert(result.message || 'Failed to add to cart');
    }
  };

  return (
    <section className="container py-4 text-center">
      <h2 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "2.5rem" }}>
        Dog Breed
      </h2>
      <p className="text-dark fs-5 mt-2">
        Find yourself a perfect friend from a wide variety of choices.
      </p>

      <div className="row justify-content-center mt-5">
        {breeds.map((b, i) => (
          <div key={i} className="col-3 col-sm-3 col-md-2 text-center mb-4">
            <Link to={`/breeds/${b.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <img
                src={b.img}
                className="rounded-circle img-fluid breed-img-circle"
                alt={b.name}
                style={{ 
                  height: "140px", 
                  width: "140px", 
                  objectFit: "cover",
                  marginBottom: "0.5rem",
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              />
            </Link>
            <p className="mt-2 text-dark fw-bold">{b.name}</p>
            <p className="mb-2" style={{ color: "#ff914d", fontWeight: 'bold' }}>
              Rs.{b.price.toFixed(2)}
            </p>
            <div className="d-flex gap-1 justify-content-center">
              <Link 
                to={`/breeds/${b.slug}`}
                className="btn btn-sm"
                style={{ backgroundColor: '#2c2c2c', color: 'white', fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                Details
              </Link>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  handleBuyMe(b);
                }}
                className="btn btn-sm"
                style={{ backgroundColor: '#ff914d', color: 'white', fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
              >
                Buy
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}