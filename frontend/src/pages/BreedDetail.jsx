import React from 'react';
// Assuming components are located in '../components/'
import Navbar from '../component/Navbar'; 
import Footer from '../component/footer'; 
// NOTE: For a real application, you would use React Router's useParams hook here.
// Example: import { useParams } from 'react-router-dom';

// ----------------------------------------------------------------------
// 1. Mock data (Completed and Enhanced)
// ----------------------------------------------------------------------
const breedDetailsData = {
    "Golden Retriever": {
        img: 'goldend', 
        temperament: "Friendly, Intelligent, Devoted",
        size: "Medium",
        origin: "Scotland",
        lifespan: "10-12 years",
        activity: "High",
        grooming: "Moderate (Weekly brushing)",
        health: "Prone to Hip/Elbow Dysplasia, heart issues",
        description: "The Golden Retriever is a sturdy, medium-sized dog known for its beautiful, water-repellent coat and its friendly demeanor. They excel as family pets, guide dogs, and in search and rescue. Highly trainable and eager to please, they require significant daily exercise.",
    },
    "Siberian Husky": {
        img: 'husky', 
        temperament: "Loyal, Mischievous, Outgoing",
        size: "Medium",
        origin: "Siberia, Russia",
        lifan: "12-14 years",
        activity: "Very High",
        grooming: "High (Heavy seasonal shedding, daily brushing needed)",
        health: "Prone to eye issues (cataracts, corneal dystrophy)",
        description: "Huskies are an energetic and resilient breed. They were originally bred to pull sleds over long distances. They are known for their striking ice-blue or multi-colored eyes and thick double coat, requiring significant exercise and mental stimulation. They are also known escape artists.",
    },
    "German Shepherd": {
        img: 'shepherd', 
        temperament: "Loyal, Courageous, Confident",
        size: "Large",
        origin: "Germany",
        lifespan: "9-13 years",
        activity: "High",
        grooming: "Moderate (Shed constantly)",
        health: "Prone to Hip/Elbow Dysplasia, Bloat",
        description: "The German Shepherd is one of the world's most recognizable breeds, valued for its intelligence, strength, and loyalty. They are versatile, excelling as police, military, and service dogs, but they also make excellent, protective family companions with proper training.",
    },
    "Pug": {
        img: 'pug', 
        temperament: "Charming, Playful, Stubborn",
        size: "Small",
        origin: "China",
        lifespan: "13-15 years",
        activity: "Low",
        grooming: "Low (Short coat, but wrinkles need cleaning)",
        health: "Brachycephalic syndrome (breathing issues), eye problems",
        description: "Pugs are small, compact dogs with deep wrinkles and a curled tail. Known for their expressive face and charming, mischievous personality, they thrive on human companionship. Due to their flattened faces, they do not tolerate heat well and need careful exercise planning.",
    },
};

// ----------------------------------------------------------------------
// 2. Component Logic (Modified to include new fields)
// ----------------------------------------------------------------------
export default function BreedDetail({ breedName = "Golden Retriever" }) { 
    
    // In a real app with React Router: 
    // const { breedName: urlBreedName } = useParams();
    // const breed = breedDetailsData[urlBreedName.replace('-', ' ').replace(/\b\w/g, c => c.toUpperCase())];
    
    const breed = breedDetailsData[breedName];

    // Handle case where breed is not found
    if (!breed) {
        return (
            <>
                <Navbar />
                <main className="container py-5 text-center">
                    <h1 className="text-danger">Breed Not Found</h1>
                    <p>The breed "{breedName}" does not exist in our catalog.</p>
                </main>
                <Footer />
            </>
        );
    }
    
    return (
        <>
            <Navbar />

            {/* Breed Detail Content */}
            <main className="container py-5">
                <div className="row">
                    
                    {/* Image and Basic Info (Left Column) */}
                    <div className="col-lg-5 mb-4 mb-lg-0">
                        <div className="card shadow-lg border-0" style={{ borderRadius: "1rem" }}>
                            <img 
                                src={`../assets/${breedName.toLowerCase().replace(' ', '')}.jpg`} // Conceptual image path
                                className="card-img-top" 
                                alt={breedName} 
                                style={{ height: "400px", objectFit: "cover", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
                            />
                            <div className="card-body text-center bg-light">
                                <h2 className="fw-bolder" style={{ color: "#2c2c2c" }}>
                                    {breedName}
                                </h2>
                                <p className="fs-5" style={{ color: "#ff914d" }}>
                                    {breed.temperament}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description and Key Stats (Right Column) */}
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

                        <a href="/breeds" className="btn btn-lg btn-secondary-custom mt-4">
                            &larr; Back to Catalog
                        </a>
                    </div>

                </div>
            </main>

            <Footer />
        </>
    );
}