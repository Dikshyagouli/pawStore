import React, { useMemo } from 'react';
// Assuming components are located in '../components/'
import Navbar from '../component/Navbar'; 
import Footer from '../component/footer'; 
import { useLocation } from 'react-router-dom';
import goldend from '../assets/golden.jpg';
import husky from '../assets/husky.jpg';
import shepherd from '../assets/shepherd.jpg';
import pug from '../assets//pug.jpg';

// Mock data for a Breeds Catalog
const allBreeds = [
    { name: "Golden Retriever", temperament: "Friendly, Intelligent, Devoted", size: "Medium", img: goldend },
    { name: "Siberian Husky", temperament: "Loyal, Mischievous, Outgoing", size: "Medium", img: husky },
    { name: "German Shepherd", temperament: "Loyal, Courageous, Confident", size: "Large", img: shepherd },
    { name: "Pug", temperament: "Charming, Playful, Stubborn", size: "Small", img: pug },
    // Add more breeds here...
];

export default function Breeds() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const filteredBreeds = useMemo(() => {
        if (!searchQuery) return allBreeds;
        return allBreeds.filter((breed) => {
            const haystack = `${breed.name} ${breed.size} ${breed.temperament}`.toLowerCase();
            return haystack.includes(searchQuery);
        });
    }, [searchQuery]);

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
                
                {/* Optional inline hint when coming from navbar search */}
                {searchQuery && (
                    <p className="text-center text-muted mb-4">
                        Showing breeds matching "<strong>{searchQuery}</strong>"
                    </p>
                )}

                {/* Breed Grid / Cards */}
                <div className="row g-4">
                    {filteredBreeds.map((breed, index) => (
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
                                    {/* --- UPDATED LINK (Conceptual) --- */}
                                    {/* In a real app with React Router, this would be: 
                                    <Link to={`/breeds/${breed.name.toLowerCase().replace(' ', '-')}`} ...>
                                    */}
                                    <a 
                                        href={`/breeds/${breed.name.toLowerCase().replace(' ', '-')}`} 
                                        className="btn btn-sm btn-orange-custom mt-2"
                                    >
                                        View Details
                                    </a>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredBreeds.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <h5 className="mb-2">No breeds found</h5>
                            <p className="text-muted">Try searching with another breed name, size, or temperament.</p>
                        </div>
                    )}
                </div>

            </main>

            <Footer />
        </>
    );
}