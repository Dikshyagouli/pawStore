import React, { useState } from "react";
import { useCart } from '../context/CartContext.jsx'; 
import { useAuth } from '../context/AuthContext.jsx'; 
import heroSectionimg from "../assets/herosecton.jpg";
import goldenImg from "../assets/golden.jpg"; 
import huskyImg from "../assets/husky.jpg"; 

const sliderData = [
  {
    id: 8, 
    img: heroSectionimg,
    breed: "Corgi",
    price: 1400.00,
    title: "Everybody Needs A Friend In Life.",
    description: "The Corgi is intelligent, quick and curious. It is a kind, adventurous breed which shows a large measure of independence.",
  },
  {
    id: 1, 
    img: goldenImg,
    breed: "Golden Retriever",
    price: 1200.00,
    title: "Your Loyal, Loving Companion Awaits.",
    description: "The Golden Retriever is friendly, intelligent, and devoted. Known for its kind eyes and eagerness to please.",
  },
  {
    id: 2, 
    img: huskyImg,
    breed: "Siberian Husky",
    price: 1500.00,
    title: "A Spirited Adventurer for Your Home.",
    description: "Siberian Huskies are loyal, mischievous, and outgoing. Bred for endurance, they are highly energetic and love to run.",
  },
];

export default function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSlide = sliderData[activeIndex]; 
    
    const { addItem } = useCart();
    const { isLoggedIn } = useAuth();

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + sliderData.length) % sliderData.length);
    };

    const handleBuyMe = async (slide) => {
        if (!isLoggedIn) {
            alert('Please login to add items to cart');
            return;
        }

        const itemToAdd = {
            id: slide.id,
            name: slide.breed,
            price: slide.price,
            quantity: 1,
        };

        const result = await addItem(itemToAdd);
        if (result.success) {
            alert(`${slide.breed} added to cart!`);
        } else {
            alert(result.message || 'Failed to add to cart');
        }
    };

    return (
        <section className="container-fluid py-5 hero-section">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-md-6 text-center mb-4 mb-md-0 order-md-1">
                        <img
                            src={activeSlide.img} 
                            className="img-fluid rounded-circle shadow-lg"
                            alt={activeSlide.breed}
                            style={{ height: "400px", width: "400px", objectFit: "cover" }}
                        />
                        <p className="mt-3 text-dark d-flex justify-content-center align-items-center">
                            <i className="bi bi-arrow-left me-2" style={{ cursor: 'pointer' }} onClick={prevSlide}></i>
                            {activeSlide.breed} 
                            <i className="bi bi-arrow-right ms-2" style={{ cursor: 'pointer' }} onClick={nextSlide}></i>
                        </p>
                    </div>

                    <div className="col-md-6 text-md-start text-center order-md-2 hero-text">
                        <h1 className="fw-bolder" style={{ fontSize: "3.5em", lineHeight: "1.2" }}>
                            {activeSlide.title} 
                        </h1>
                        <p className="mt-3 fs-5">
                            {activeSlide.description} 
                        </p>
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
    );
}