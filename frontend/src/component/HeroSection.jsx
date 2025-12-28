import React, { useState } from "react";
// Assuming you have these extra image files for the slider to work
import heroSectionimg from "../assets/herosecton.jpg";
import goldenImg from "../assets/golden.jpg"; 
import huskyImg from "../assets/husky.jpg"; 

// 1. Data array for the slider items
const sliderData = [
  {
    id: 1,
    img: heroSectionimg,
    breed: "Corgi (2 months)",
    title: "Everybody Needs A Friend In Life.",
    description: "The Corgi is intelligent, quick and curious. It is a kind, adventurous breed which shows a large measure of independence. They are good with children and normally kind with strangers.",
  },
  {
    id: 2,
    img: goldenImg,
    breed: "Golden Retriever (5 months)",
    title: "Your Loyal, Loving Companion Awaits.",
    description: "The Golden Retriever is friendly, intelligent, and devoted. Known for its kind eyes and eagerness to please, this breed makes an excellent family pet and requires moderate to high daily exercise.",
  },
  {
    id: 3,
    img: huskyImg,
    breed: "Siberian Husky (8 months)",
    title: "A Spirited Adventurer for Your Home.",
    description: "Siberian Huskies are loyal, mischievous, and outgoing. Bred for endurance, they are highly energetic and love to run. They require consistent training and are excellent with families who can provide a stimulating environment.",
  },
];

export default function HeroSection() {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeSlide = sliderData[activeIndex]; 

    const nextSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % sliderData.length);
    };

    const prevSlide = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + sliderData.length) % sliderData.length);
    };

    return (
        <section className="container-fluid py-5 hero-section">
            <div className="container">
                <div className="row align-items-center">

                    {/* Image Column */}
                    <div className="col-md-6 text-center mb-4 mb-md-0 order-md-1">
                        <img
                            src={activeSlide.img} 
                            className="img-fluid rounded-circle shadow-lg"
                            alt={activeSlide.breed}
                            style={{ 
                                // 🚀 FIXED: Set a fixed height AND width for a perfect, uniform circle
                                height: "400px", 
                                width: "400px", 
                                objectFit: "cover", // Ensures image covers the area without distortion
                            }}
                        />
                        {/* The dynamic text below the image with clickable arrows */}
                        <p className="mt-3 text-dark d-flex justify-content-center align-items-center">
                            <i 
                                className="bi bi-arrow-left me-2" 
                                style={{ cursor: 'pointer' }}
                                onClick={prevSlide}
                            ></i>
                            {activeSlide.breed} 
                            <i 
                                className="bi bi-arrow-right ms-2" 
                                style={{ cursor: 'pointer' }}
                                onClick={nextSlide}
                            ></i>
                        </p>
                    </div>

                    {/* Text Content Column */}
                    <div className="col-md-6 text-md-start text-center order-md-2 hero-text">
                        <h1 className="fw-bolder" style={{ fontSize: "3.5em", lineHeight: "1.2" }}>
                            {activeSlide.title} 
                        </h1>
                        <p className="mt-3 fs-5">
                            {activeSlide.description} 
                        </p>
                        <button className="btn mt-4 px-5 py-3 fw-bold btn-buy-me">
                            Buy Me
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}