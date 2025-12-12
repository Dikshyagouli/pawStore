import React from 'react';
// Assuming components are located in '../components/'
import Navbar from '../component/Navbar'; 
import Footer from '../component/footer'; 
import goldend from '../assets/golden.jpg';
import husky from '../assets/husky.jpg';
import shepherd from '../assets/shepherd.jpg';
import pug from '../assets//pug.jpg';
// We can reuse BreedSection's data structure as a starting point, but the page layout will be different.

// Mock data for a Breeds Catalog
const allBreeds = [
    { name: "Golden Retriever", temperament: "Friendly, Intelligent, Devoted", size: "Medium", img: goldend },
    { name: "Siberian Husky", temperament: "Loyal, Mischievous, Outgoing", size: "Medium", img: husky },
    { name: "German Shepherd", temperament: "Loyal, Courageous, Confident", size: "Large", img: shepherd },
    { name: "Pug", temperament: "Charming, Playful, Stubborn", size: "Small", img: pug },
    // Add more breeds here...
];

export default function Breeds() {
    return (
        <>
            <Navbar />

            {/* Breeds Page Content */}
            <main className="container py-5">
                
                {/* Header */}
                <header className="text-center mb-5">
                    <h1 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "3rem" }}>
                        Our Dog Breeds Catalog
                    </h1>
                    <p className="fs-5 mt-3" style={{ color: "#ff914d" }}>
                        Find the perfect companion based on temperament and lifestyle.
                    </p>
                </header>
                
                {/* Filter/Search Bar Placeholder (Optional but good for a catalog page) 
                */}
                <div className="row justify-content-center mb-5">
                    <div className="col-md-8">
                        <input
                            type="search"
                            className="form-control form-control-lg rounded-pill border-0 shadow-sm"
                            placeholder="Search by breed name, size, or temperament..."
                            style={{ backgroundColor: "#ffe8da" }}
                        />
                    </div>
                </div>

                {/* Breed Grid / Cards */}
                <div className="row g-4">
                    {allBreeds.map((breed, index) => (
                        <div key={index} className="col-lg-4 col-md-6">
                            <div className="card h-100 shadow-sm border-0" style={{ borderRadius: "1rem" }}>
                                <img 
                                    src={breed.img} 
                                    className="card-img-top" 
                                    alt={breed.name} 
                                    style={{ height: "250px", objectFit: "cover", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
                                />
                                <div className="card-body">
                                    <h3 className="card-title fw-bold" style={{ color: "#ff914d" }}>
                                        {breed.name}
                                    </h3>
                                    <p className="card-text text-dark">
                                        **Temperament:** {breed.temperament}
                                        <br/>
                                        **Size:** {breed.size}
                                    </p>
                                    <a href="#" className="btn btn-sm btn-orange-custom mt-2">View Details</a>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

            </main>

            <Footer />
        </>
    );
}