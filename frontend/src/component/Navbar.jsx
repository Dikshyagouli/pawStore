import React from 'react';
import { NavLink } from 'react-router-dom'; // 1. Use NavLink for routing

export default function Navbar() {
    // Define links and their paths
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Breeds", path: "/breeds" },
        { name: "Accessories", path: "/accessories" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
    ];
    
    // Note: The background color #fff5ee is the light peach color used in the Hero/Newsletter sections.
    return (
        <nav className="navbar navbar-expand-lg py-3 sticky-top" style={{ backgroundColor: "#fff5ee", boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <div className="container-fluid container">
                
                {/* 1. Logo/Brand: Styled to match the design */}
                <NavLink className="navbar-brand d-flex align-items-center" to="/" style={{ color: '#2c2c2c' }}>
                    {/* Placeholder for the Corgi icon/image */}
                    {/* You can use a dedicated image here, e.g., <img src="/images/pawstore_logo.png" style={{ height: "30px" }} /> */}
                    <span style={{ fontSize: "1.5em", color: "#ff914d" }}>&#128054;</span> 
                    <span className="ms-2 fw-bold fs-5">Pawstore</span>
                </NavLink>

                {/* Toggle Button for small screens */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    {/* 2. Navigation Links (Centered) */}
                    <ul className="navbar-nav mx-auto">
                        {navItems.map((item) => (
                            <li className="nav-item" key={item.name}>
                                {/* NavLink styling: Orange color for the active link, dark for others */}
                                <NavLink 
                                    className="nav-link mx-3 fw-medium" 
                                    to={item.path} 
                                    style={({ isActive }) => ({ 
                                        color: isActive ? '#ff914d' : '#2c2c2c' // Active color is orange
                                    })}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* 3. Search Bar (Right Aligned) */}
                    <form className="d-flex" role="search">
                        <div className="input-group">
                            {/* Input Field: Light background, rounded on the left */}
                            <input
                                className="form-control border-0"
                                type="search"
                                placeholder="Search for pets..."
                                aria-label="Search"
                                style={{ backgroundColor: "#ffe8da", borderTopLeftRadius: "25px", borderBottomLeftRadius: "25px" }}
                            />
                            {/* Search Button: Use the custom orange button style */}
                            <button 
                                className="btn btn-orange-custom" 
                                type="submit" 
                                // Override the default custom button radius to match the search bar component
                                style={{ borderTopRightRadius: "25px", borderBottomRightRadius: "25px", borderTopLeftRadius: 0, borderBottomLeftRadius: 0, width: "50px" }}
                            >
                                <i className="bi bi-search"></i>
                            </button>
                        </div>
                    </form>

                </div>
            </div>
        </nav>
    );
}