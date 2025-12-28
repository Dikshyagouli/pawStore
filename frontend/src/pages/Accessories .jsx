import React, { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
// Imports necessary components for structure
import Navbar from '../component/Navbar'; 
import Footer from '../component/Footer'; 
// 🚀 1. Import the useCart hook
import { useCart } from '../context/CartContext.jsx'; 

import bone from '../assets/acc_bone.jpg';
import food from '../assets/acc_food.jpg';
import bed from '../assets/acc_bed.jpg';
import leash from '../assets/acc_leash.jpg';
import brush from '../assets/acc_brush.jpg';
import jacket from '../assets/cc_jacket.jpg';
import treats from '../assets/acc_treats.jpg';
import water from '../assets/acc_water.jpg';

// Mock data for the Accessories Catalog (NOTE: Prices are strings)
const accessories = [
    // 🚀 NOTE: Added a unique ID (simulated) for cart tracking
    { id: 1, name: "Squeaky Bone Toy", category: "Toys", price: "8.99", img: bone },
    { id: 2, name: "Salmon Dry Food", category: "Food", price: "45.50", img: food },
    { id: 3, name: "Cozy Fleece Bed", category: "Beds", price: "79.00", img: bed },
    { id: 4, name: "Leather Leash Set", category: "Leashes", price: "35.99", img: leash },
    { id: 5, name: "Grooming Brush", category: "Grooming", price: "15.00", img: brush },
    { id: 6, name: "Winter Dog Jacket", category: "Apparel", price: "55.00", img: jacket },
    { id: 7, name: "Teeth Cleaning Treats", category: "Treats", price: "12.00", img: treats },
    { id: 8, name: "Portable Water Bottle", category: "Travel", price: "22.50", img: water },
];

export default function Accessories() {
    // 🚀 2. Get the addItem function from the Cart Context
    const { addItem } = useCart(); 
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('search')?.toLowerCase() || '';

    const filteredAccessories = useMemo(() => {
        if (!searchQuery) return accessories;
        return accessories.filter((item) => 
            item.name.toLowerCase().includes(searchQuery) ||
            item.category.toLowerCase().includes(searchQuery)
        );
    }, [searchQuery]);

    // 🚀 3. Define the click handler function
    const handleAddToCart = async (item) => {
        // Construct the item object in the format required by CartContext:
        // { id, name, price (as number), quantity }
        const itemToAdd = {
            id: item.id,
            name: item.name,
            // Convert price string to a float number
            price: parseFloat(item.price), 
            quantity: 1, // Always add 1 item on click
        };

        const result = await addItem(itemToAdd);
        if (result.success) {
            alert(`${item.name} added to cart!`);
        } else {
            alert(result.message || 'Failed to add item to cart');
        }
    };

    return (
        <>
            <Navbar />

            {/* Accessories Page Content */}
            <main className="container py-5">
                
                {/* Header */}
                <header className="text-center mb-5">
                    <h1 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "3rem" }}>
                        Stylish Pet Accessories
                    </h1>
                    <p className="fs-5 mt-3" style={{ color: "#ff914d" }}>
                        Everything your best friend needs, from food to fun!
                    </p>
                </header>
                
                {/* Product Grid / Cards */}
                {searchQuery && (
                    <p className="text-muted mb-3">
                        Showing results for "<strong>{searchQuery}</strong>"
                    </p>
                )}

                <div className="row g-4">
                    {filteredAccessories.map((item) => ( // Removed 'index', using item.id as key now
                        <div key={item.id} className="col-lg-3 col-md-4 col-sm-6">
                            {/* Product Card: Reusing rounded card/shadow styling */}
                            <div className="card h-100 shadow-sm border-0 product-card" style={{ borderRadius: "1rem" }}>
                                <img 
                                    src={item.img} 
                                    className="card-img-top" 
                                    alt={item.name} 
                                    style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "1rem", borderTopRightRadius: "1rem" }}
                                />
                                <div className="card-body text-start">
                                    <span className="badge rounded-pill bg-secondary mb-2">{item.category}</span>
                                    <h5 className="card-title fw-bold text-dark">{item.name}</h5>
                                    {/* Orange price for emphasis */}
                                    <p className="fs-4 fw-bold" style={{ color: "#ff914d" }}>
                                        ${item.price}
                                    </p>
                                    {/* Orange button using the custom class */}
                                    <button 
                                        className="btn btn-sm btn-orange-custom w-100 mt-2"
                                        // 🚀 4. Attach the handler
                                        onClick={() => handleAddToCart(item)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    {filteredAccessories.length === 0 && (
                        <div className="col-12 text-center py-5">
                            <h5 className="mb-2">No items found</h5>
                            <p className="text-muted">Try a different search term.</p>
                        </div>
                    )}
                </div>

            </main>

            <Footer />
        </>
    );
}