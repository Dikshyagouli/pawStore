import React from 'react';
import Navbar from '../components/Navbar'; 
import Footer from '../components/Footer'; 
import blog1 from '../assets/blogPage1.jpg';
import blog2 from '../assets/blogPage2.jpg';
import blog3 from '../assets/blogPage3.jpg';
import blog4 from '../assets/blogPage4.jpg';

const blogPosts = [
    { 
        title: "Mastering Obedience: 5 Essential Commands for Every Dog", 
        excerpt: "Learn the foundation of canine communication with these five easy-to-teach commands that boost safety and confidence.", 
        date: "Oct 15, 2025", 
        author: "Pawstore Team", 
        img: blog1 
    },
    { 
        title: "Choosing the Right Food: Wet vs. Dry vs. Raw Diet", 
        excerpt: "Navigate the complex world of dog nutrition and find out which diet best suits your dog's age, breed, and activity level.", 
        date: "Sep 28, 2025", 
        author: "Dr. L. Canine", 
        img: blog2 
    },
    { 
        title: "Winter Care Guide: Keeping Your Dog Warm and Safe", 
        excerpt: "From paw protection to cozy sweaters, ensure your pet is safe and comfortable during the colder months.", 
        date: "Nov 01, 2025", 
        author: "Pawstore Team", 
        img: blog3 
    },
    { 
        title: "The Best Indestructible Toys for Heavy Chewers", 
        excerpt: "Tired of replacing toys? We tested the top ten toughest toys that can withstand even the most dedicated chewers.", 
        date: "Oct 22, 2025", 
        author: "M. Tester", 
        img: blog4 
    },
];

const categories = ["Training Tips", "Product Reviews", "Health & Wellness", "Dog Breeds", "Travel"];

export default function Blog() {
    return (
        <>
            <Navbar />

            <div className="container py-5">
                
                <header className="text-center mb-5">
                    <h1 className="fw-bolder" style={{ color: "#2c2c2c", fontSize: "3rem" }}>
                        The Pawstore Blog
                    </h1>
                    <p className="fs-5 mt-3" style={{ color: "#ff914d" }}>
                        All the information, advice, and tips you need for your pet's happiness.
                    </p>
                </header>
                
                <div className="row g-5">
                    
                    <div className="col-lg-8">
                        {blogPosts.map((post, index) => (
                            <div key={index} className="card mb-4 shadow-sm border-0" style={{ borderRadius: "1rem" }}>
                                <div className="row g-0">
                                    <div className="col-md-4">
                                        <img 
                                            src={post.img} 
                                            className="img-fluid h-100" 
                                            alt={post.title} 
                                            style={{ objectFit: "cover", borderTopLeftRadius: "1rem", borderBottomLeftRadius: "1rem" }}
                                        />
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body">
                                            <h4 className="card-title fw-bold" style={{ color: "#2c2c2c" }}>
                                                {post.title}
                                            </h4>
                                            <p className="card-text text-muted small mb-3">
                                                By {post.author} on {post.date}
                                            </p>
                                            <p className="card-text text-dark">
                                                {post.excerpt}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}