import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../component/Navbar'; 
import Footer from '../component/Footer.jsx';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import goldend from '../assets/golden.jpg';
import husky from '../assets/husky.jpg';
import shepherd from '../assets/shepherd.jpg';
import pug from '../assets/pug.jpg';
import pitbull from '../assets/pitbull.jpg';
import spitz from '../assets/spitz..jpeg';
import labrador from '../assets/labrador.jpg';
import corgi from '../assets/herosecton.jpg';

const breedDetailsData = {
    "golden-retriever": {
        name: "Golden Retriever",
        img: goldend,
        id: 1,
        price: 1200.00,
        temperament: "Friendly, Intelligent, Devoted",
        size: "Medium",
        origin: "Scotland",
        lifespan: "10-12 years",
        activity: "High",
        grooming: "Moderate (Weekly brushing)",
        health: "Prone to Hip/Elbow Dysplasia, heart issues",
        description: "The Golden Retriever is a sturdy, medium-sized dog known for its beautiful, water-repellent coat and its friendly demeanor. They excel as family pets, guide dogs, and in search and rescue. Highly trainable and eager to please, they require significant daily exercise.",
    },
    "siberian-husky": {
        name: "Siberian Husky",
        img: husky,
        id: 2,
        price: 1500.00,
        temperament: "Loyal, Mischievous, Outgoing",
        size: "Medium",
        origin: "Siberia, Russia",
        lifespan: "12-14 years",
        activity: "Very High",
        grooming: "High (Heavy seasonal shedding, daily brushing needed)",
        health: "Prone to eye issues (cataracts, corneal dystrophy)",
        description: "Huskies are an energetic and resilient breed. They were originally bred to pull sleds over long distances. They are known for their striking ice-blue or multi-colored eyes and thick double coat, requiring significant exercise and mental stimulation. They are also known escape artists.",
    },
    "german-shepherd": {
        name: "German Shepherd",
        img: shepherd,
        id: 3,
        price: 1800.00,
        temperament: "Loyal, Courageous, Confident",
        size: "Large",
        origin: "Germany",
        lifespan: "9-13 years",
        activity: "High",
        grooming: "Moderate (Shed constantly)",
        health: "Prone to Hip/Elbow Dysplasia, Bloat",
        description: "The German Shepherd is one of the world's most recognizable breeds, valued for its intelligence, strength, and loyalty. They are versatile, excelling as police, military, and service dogs, but they also make excellent, protective family companions with proper training.",
    },
    "pug": {
        name: "Pug",
        img: pug,
        id: 4,
        price: 800.00,
        temperament: "Charming, Playful, Stubborn",
        size: "Small",
        origin: "China",
        lifespan: "13-15 years",
        activity: "Low",
        grooming: "Low (Short coat, but wrinkles need cleaning)",
        health: "Brachycephalic syndrome (breathing issues), eye problems",
        description: "Pugs are small, compact dogs with deep wrinkles and a curled tail. Known for their expressive face and charming, mischievous personality, they thrive on human companionship. Due to their flattened faces, they do not tolerate heat well and need careful exercise planning.",
    },
    "pitbull": {
        name: "Pitbull",
        img: pitbull,
        id: 5,
        price: 1300.00,
        temperament: "Loyal, Strong, Energetic",
        size: "Medium",
        origin: "United States",
        lifespan: "12-14 years",
        activity: "High",
        grooming: "Low (Short coat, minimal grooming)",
        health: "Generally healthy, but prone to hip dysplasia",
        description: "Pitbulls are strong, confident dogs known for their loyalty and energy. They are intelligent and require consistent training and socialization. With proper care, they make excellent family companions.",
    },
    "japanese-spitz": {
        name: "Japanese Spitz",
        img: spitz,
        id: 6,
        price: 1000.00,
        temperament: "Friendly, Playful, Alert",
        size: "Small",
        origin: "Japan",
        lifespan: "12-14 years",
        activity: "Moderate",
        grooming: "Moderate (Regular brushing needed)",
        health: "Generally healthy breed",
        description: "Japanese Spitz are small, fluffy dogs with a bright and cheerful personality. They are known for their white, double-layered coat and fox-like appearance. They are excellent family pets and get along well with children.",
    },
    "labrador": {
        name: "Labrador",
        img: labrador,
        id: 7,
        price: 1100.00,
        temperament: "Friendly, Active, Outgoing",
        size: "Large",
        origin: "Canada/United Kingdom",
        lifespan: "10-12 years",
        activity: "High",
        grooming: "Moderate (Regular brushing, seasonal shedding)",
        health: "Prone to hip/elbow dysplasia, obesity",
        description: "Labradors are one of the most popular dog breeds worldwide. They are known for their friendly nature, intelligence, and versatility. They excel as family pets, service dogs, and working dogs. They require regular exercise and mental stimulation.",
    },
    "corgi": {
    name: "Corgi",
    img: corgi,
    id: 8,
    price: 1400.00,
    temperament: "Affectionate, Intelligent, Playful",
    size: "Small",
    origin: "Wales, United Kingdom",
    lifespan: "12-15 years",
    activity: "Moderate",
    grooming: "Moderate (Regular brushing, heavy seasonal shedding)",
    health: "Prone to hip dysplasia, intervertebral disc disease, obesity",
    description: "Corgis are small but sturdy dogs with short legs and a big personality. Originally bred for herding cattle, they are highly intelligent, alert, and eager to please. Corgis make excellent family pets and are known for their loyalty, playful nature, and expressive faces. Regular exercise and mental stimulation are important to keep them healthy and happy.",
},


};

export default function BreedDetail() {
    const { breedName } = useParams();
    const { addItem } = useCart();
    const { isLoggedIn } = useAuth();
    
    const breed = breedDetailsData[breedName];

    const handleBuyMe = async () => {
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
    if (!breed) {
        return (
            <>
                <Navbar />
                <main className="container py-5 text-center">
                    <h1 className="text-danger">Breed Not Found</h1>
                    <p>The breed "{breedName}" does not exist in our catalog.</p>
                    <Link to="/breeds" className="btn mt-3" style={{ backgroundColor: '#ff914d', color: 'white' }}>
                        Back to Breeds
                    </Link>
                </main>
                <Footer />
            </>
        );
    }
    
    return (
        <>
            <Navbar />

            <main className="container py-5">
                <div className="row">
                    
                    <div className="col-lg-5 mb-4 mb-lg-0">
                        <div className="card shadow-lg border-0" style={{ borderRadius: "1rem" }}>
                            <img 
                                src={breed.img}
                                className="card-img-top" 
                                alt={breed.name} 
                                style={{ height: "400px", objectFit: "cover", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
                            />
                            <div className="card-body text-center bg-light">
                                <h2 className="fw-bolder" style={{ color: "#2c2c2c" }}>
                                    {breed.name}
                                </h2>
                                <p className="fs-5" style={{ color: "#ff914d" }}>
                                    {breed.temperament}
                                </p>
                                <div className="mt-3">
                                    <h3 className="mb-0" style={{ color: "#ff914d", fontSize: "2.5rem" }}>
                                        Rs.{breed.price.toFixed(2)}
                                    </h3>
                                </div>
                                <button
                                    onClick={handleBuyMe}
                                    className="btn btn-lg w-100 mt-3"
                                    style={{ backgroundColor: '#ff914d', color: 'white' }}
                                >
                                    <i className="bi bi-cart-plus me-2"></i>
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-7">
                        <h3 className="mb-4 fw-bold" style={{ color: "#ff914d" }}>Breed Overview</h3>
                        <p className="fs-5 text-dark">
                            {breed.description}
                        </p>
                        
                        <h4 className="mt-5 fw-bold" style={{ color: "#2c2c2c" }}>Key Statistics</h4>
                        <div className="row mt-3 p-3 border rounded shadow-sm">
                            <div className="col-sm-6 mb-3">
                                <strong>Origin:</strong> <span className="float-end">{breed.origin}</span>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <strong>Size:</strong> <span className="float-end">{breed.size}</span>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <strong>Lifespan:</strong> <span className="float-end">{breed.lifespan}</span>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <strong>Activity Level:</strong> <span className="float-end">{breed.activity}</span>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <strong>Grooming Needs:</strong> <span className="float-end">{breed.grooming}</span>
                            </div>
                            <div className="col-sm-6 mb-3">
                                <strong>Common Health Issues:</strong> <span className="float-end">{breed.health}</span>
                            </div>
                        </div>

                        <Link 
                            to="/breeds" 
                            className="btn btn-lg mt-4"
                            style={{ backgroundColor: '#2c2c2c', color: 'white' }}
                        >
                            &larr; Back to Catalog
                        </Link>
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
}