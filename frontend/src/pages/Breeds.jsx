import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../component/Navbar'; 
import Footer from '../component/footer'; 
import { useLocation } from 'react-router-dom';
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

const allBreeds = [
    { id: 1, name: "Golden Retriever", temperament: "Friendly, Intelligent, Devoted", size: "Medium", img: goldend, price: 1200.00 },
    { id: 2, name: "Siberian Husky", temperament: "Loyal, Mischievous, Outgoing", size: "Medium", img: husky, price: 1500.00 },
    { id: 3, name: "German Shepherd", temperament: "Loyal, Courageous, Confident", size: "Large", img: shepherd, price: 1800.00 },
    { id: 4, name: "Pug", temperament: "Charming, Playful, Stubborn", size: "Small", img: pug, price: 800.00 },
    { id: 5, name: "Pitbull", temperament: "Loyal, Strong, Energetic", size: "Medium", img: pitbull, price: 1300.00 },
    { id: 6, name: "Japanese Spitz", temperament: "Friendly, Playful, Alert", size: "Small", img: spitz, price: 1000.00 },
    { id: 7, name: "Labrador", temperament: "Friendly, Active, Outgoing", size: "Large", img: labrador, price: 1100.00 },
    { id: 8, name: "Corgi", temperament: "Affectionate, Intelligent, Playful", size: "Small", img: corgi, price: 1400.00 },
];

export default function Breeds() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';
    const { addItem } = useCart();
    const { isLoggedIn } = useAuth();

    const filteredBreeds = useMemo(() => {
        if (!searchQuery) return allBreeds;
        return allBreeds.filter((breed) => {
            const haystack = `${breed.name} ${breed.size} ${breed.temperament}`.toLowerCase();
            return haystack.includes(searchQuery);
        });
    }, [searchQuery]);

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
        <>
            <Navbar />

            <main className="container py-5">
                
                <header className="text-center mb-5">
                    <h1 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "3rem" }}>
                        Our Dog Breeds Catalog
                    </h1>
                    <p className="fs-5 mt-3" style={{ color: "#ff914d" }}>
                        Find the perfect companion based on temperament and lifestyle.
                    </p>
                </header>
                
                {searchQuery && (
                    <p className="text-center text-muted mb-4">
                        Showing breeds matching "<strong>{searchQuery}</strong>"
                    </p>
                )}

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
                                <div className="card-body d-flex flex-column">
                                    <h3 className="card-title fw-bold" style={{ color: "#ff914d" }}>
                                        {breed.name}
                                    </h3>
                                    <p className="card-text text-dark mb-2">
                                        <strong>Temperament:</strong> {breed.temperament}
                                        <br/>
                                        <strong>Size:</strong> {breed.size}
                                    </p>
                                    <div className="mb-3">
                                        <h4 className="mb-0" style={{ color: "#ff914d" }}>
                                            Rs.{breed.price.toFixed(2)}
                                        </h4>
                                    </div>
                                    <div className="mt-auto d-flex gap-2">
                                        <Link 
                                            to={`/breeds/${breed.name.toLowerCase().replace(/\s+/g, '-')}`}
                                            className="btn btn-sm flex-fill"
                                            style={{ backgroundColor: '#2c2c2c', color: 'white' }}
                                        >
                                            View Details
                                        </Link>
                                        <button
                                            onClick={() => handleBuyMe(breed)}
                                            className="btn btn-sm flex-fill"
                                            style={{ backgroundColor: '#ff914d', color: 'white' }}
                                        >
                                            Buy Me
                                        </button>
                                    </div>
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