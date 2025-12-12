import React from 'react';
// Imports necessary components for structure (Navbar and Footer are assumed to be in ../components)
import Navbar from '../component/Navbar'; 
import Footer from '../component/Footer'; 
import bone from '../assets/acc_bone.jpg';
import food from '../assets/acc_food.jpg';
import bed from '../assets/acc_bed.jpg';
import leash from '../assets/acc_leash.jpg';
import brush from '../assets/acc_brush.jpg';
import jacket from '../assets/cc_jacket.jpg';
import treats from '../assets/acc_treats.jpg';
import water from '../assets/acc_water.jpg';

// Mock data for the Accessories Catalog
const accessories = [
    { name: "Squeaky Bone Toy", category: "Toys", price: "8.99", img: bone },
    { name: "Salmon Dry Food", category: "Food", price: "45.50", img: food },
    { name: "Cozy Fleece Bed", category: "Beds", price: "79.00", img: bed },
    { name: "Leather Leash Set", category: "Leashes", price: "35.99", img: leash },
    { name: "Grooming Brush", category: "Grooming", price: "15.00", img: brush },
    { name: "Winter Dog Jacket", category: "Apparel", price: "55.00", img: jacket },
    { name: "Teeth Cleaning Treats", category: "Treats", price: "12.00", img: treats },
    { name: "Portable Water Bottle", category: "Travel", price: "22.50", img: water },
];

export default function Accessories() {
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
                <div className="row g-4">
                    {accessories.map((item, index) => (
                        <div key={index} className="col-lg-3 col-md-4 col-sm-6">
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
                                    <button className="btn btn-sm btn-orange-custom w-100 mt-2">Add to Cart</button>
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