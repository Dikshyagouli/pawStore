import React, { useState } from "react";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import heroSectionimg from "../assets/herosecton.jpg";
import goldenImg from "../assets/golden.jpg";
import huskyImg from "../assets/husky.jpg";

const sliderData = [
  {
    id: 8,
    img: heroSectionimg,
    breed: "Corgi",
    price: 1400.0,
    title: "Everybody Needs A Friend In Life.",
    description:
      "The Corgi is intelligent, quick and curious. It is a kind, adventurous breed which shows a large measure of independence.",
  },
  {
    id: 1,
    img: goldenImg,
    breed: "Golden Retriever",
    price: 1200.0,
    title: "Your Loyal, Loving Companion Awaits.",
    description:
      "The Golden Retriever is friendly, intelligent, and devoted. Known for its kind eyes and eagerness to please.",
  },
  {
    id: 2,
    img: huskyImg,
    breed: "Siberian Husky",
    price: 1500.0,
    title: "A Spirited Adventurer for Your Home.",
    description:
      "Siberian Huskies are loyal, mischievous, and outgoing. Bred for endurance, they are highly energetic and love to run.",
  },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeSlide = sliderData[activeIndex];

  const { addItem } = useCart();
  const { isLoggedIn } = useAuth();

  const nextSlide = () =>
    setActiveIndex((prev) => (prev + 1) % sliderData.length);

  const prevSlide = () =>
    setActiveIndex((prev) => (prev - 1 + sliderData.length) % sliderData.length);

  const handleBuyMe = async (slide) => {
    if (!isLoggedIn) {
      alert("Please login to add items to cart");
      return;
    }

    const result = await addItem({
      id: slide.id,
      name: slide.breed,
      price: slide.price,
      quantity: 1,
    });

    alert(
      result.success
        ? `${slide.breed} added to cart!`
        : result.message || "Failed to add to cart"
    );
  };

  return (
    <>
      <style>{`
        .hero-section {
          min-height: 80vh;
          background-color: #fff5ee;
        }
        .hero-text {
          color: #2c2c2c;
        }
        .btn-buy-me {
          background-color: #ff914d;
          border-color: #ff914d;
          color: white;
          border-radius: 25px;
          transition: 0.3s ease;
        }
        .btn-buy-me:hover {
          background-color: #e68345;
          border-color: #e68345;
        }
      `}</style>

      <section className="container-fluid py-5 hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 text-center mb-4 mb-md-0">
              <img
                src={activeSlide.img}
                alt={activeSlide.breed}
                className="img-fluid rounded-circle shadow-lg"
                style={{ height: 400, width: 400, objectFit: "cover" }}
              />
              <p className="mt-3 d-flex justify-content-center align-items-center">
                <i
                  className="bi bi-arrow-left me-3"
                  style={{ cursor: "pointer" }}
                  onClick={prevSlide}
                />
                <strong>{activeSlide.breed}</strong>
                <i
                  className="bi bi-arrow-right ms-3"
                  style={{ cursor: "pointer" }}
                  onClick={nextSlide}
                />
              </p>
            </div>

            <div className="col-md-6 text-md-start text-center hero-text">
              <h1 className="fw-bolder" style={{ fontSize: "3.5rem" }}>
                {activeSlide.title}
              </h1>
              <p className="mt-3 fs-5">{activeSlide.description}</p>
              <button
                className="btn mt-4 px-5 py-3 fw-bold btn-buy-me"
                onClick={() => handleBuyMe(activeSlide)}
              >
                Buy Me
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
