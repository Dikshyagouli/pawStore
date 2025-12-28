import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
    // Define links and their paths
    const { totalQuantity } = useCart();
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
    };
    const navItems = [
        { name: "Home", path: "/" },
        { name: "Breeds", path: "/breeds" },
        { name: "Accessories", path: "/accessories" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
    ];

    const breedKeywords = [
        'labrador', 'husky', 'golden retriever', 'pitbull', 'spitz', 'german shepherd', 'pug',
        'small', 'medium', 'large', 'friendly', 'guard', 'calm',
    ];

    const accessoryKeywords = [
        'leash', 'bed', 'brush', 'treats', 'food', 'water bottle', 'jacket', 'toys', 'grooming',
    ];

    const suggestionsList = [...breedKeywords, ...accessoryKeywords];

    const filteredSuggestions = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return [];
        return suggestionsList
            .filter((s) => s.includes(term))
            .slice(0, 6);
    }, [searchTerm, suggestionsList]);

    const triggerSearch = (term) => {
        const value = term.trim().toLowerCase();
        if (!value) return;

        // Decide where to send the user based on the keyword
        const isAccessory = accessoryKeywords.some((k) => value.includes(k));
        const isBreedRelated = breedKeywords.some((k) => value.includes(k));

        if (isAccessory && !isBreedRelated) {
            navigate(`/accessories?search=${encodeURIComponent(value)}`);
        } else {
            // Default to breeds for breed / size / temperament / mixed terms
            navigate(`/breeds?search=${encodeURIComponent(value)}`);
        }

        setShowSuggestions(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        triggerSearch(searchTerm);
    };
    
    // Custom style object for icon links
    const iconLinkStyle = ({ isActive }) => ({
        color: isActive ? '#ff914d' : '#2c2c2c', // Active: orange, Inactive: dark
        fontSize: "1.25rem", // Standard icon size
        marginLeft: "15px", // Spacing between icons and search
        textDecoration: 'none', // Remove underline
    });

    // Note: The background color #fff5ee is the light peach color.
    return (
        <nav className="navbar navbar-expand-lg py-3 sticky-top" style={{ backgroundColor: "#fff5ee", boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <div className="container-fluid container">
                
                {/* 1. Logo/Brand: Styled to match the design */}
                <NavLink className="navbar-brand d-flex align-items-center" to="/" style={{ color: '#2c2c2c' }}>
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

                    {/* 3. Right-Aligned Group: Search, Login, Cart */}
                    <div className="d-flex align-items-center">
                        {/* Search Bar */}
                        <form className="d-flex position-relative" role="search" onSubmit={handleSearch}>
                            <div className="input-group">
                                {/* Input Field: Light background, rounded on the left */}
                                <input
                                    className="form-control border-0"
                                    type="search"
                                    placeholder="Search..."
                                    aria-label="Search"
                                    style={{ backgroundColor: "#ffe8da", borderTopLeftRadius: "25px", borderBottomLeftRadius: "25px" }}
                                    value={searchTerm}
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                        setShowSuggestions(true);
                                    }}
                                    onFocus={() => setShowSuggestions(true)}
                                />
                                {/* Search Button: Use the custom orange button style */}
                                <button 
                                    className="btn btn-orange-custom" 
                                    type="submit" 
                                    // Override the default custom button radius to match the search bar component
                                    style={{ 
                                        backgroundColor: "#ff914d", // Added explicit color in case 'btn-orange-custom' is not defined
                                        color: "white",
                                        borderTopRightRadius: "25px", 
                                        borderBottomRightRadius: "25px", 
                                        borderTopLeftRadius: 0, 
                                        borderBottomLeftRadius: 0, 
                                        width: "50px" 
                                    }}
                                >
                                    {/* Requires Bootstrap Icons (bi-search) */}
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
                            {/* Suggestions Dropdown */}
                            {showSuggestions && filteredSuggestions.length > 0 && (
                                <div 
                                    className="position-absolute w-100 bg-white shadow-sm rounded"
                                    style={{ top: '110%', zIndex: 1000 }}
                                >
                                    {filteredSuggestions.map((s) => (
                                        <button
                                            key={s}
                                            type="button"
                                            className="dropdown-item text-capitalize"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                triggerSearch(s);
                                            }}
                                            style={{ cursor: 'pointer' }}
                                        >
                                            {s}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </form>

                        {/* Login / User section */}
                        {user ? (
                            <div className="ms-3 d-flex align-items-center">
                                {user.isAdmin && (
                                    <NavLink 
                                        to="/admin" 
                                        className="d-flex align-items-center me-3" 
                                        aria-label="Admin Dashboard"
                                        style={{ textDecoration: 'none', color: '#ff914d' }}
                                    >
                                        <i className="bi bi-speedometer2" style={{ fontSize: "1.1rem" }}></i>
                                        <span className="ms-1" style={{ fontSize: "0.85rem", fontWeight: '600' }}>
                                            Admin
                                        </span>
                                    </NavLink>
                                )}
                                <NavLink 
                                    to="/profile" 
                                    className="d-flex align-items-center" 
                                    aria-label="Profile"
                                    style={{ textDecoration: 'none', color: '#2c2c2c' }}
                                >
                                    <i className="bi bi-person" style={{ color: '#ff914d', fontSize: "1.1rem" }}></i>
                                    <span className="ms-2" style={{ fontSize: "0.85rem", color: "#2c2c2c" }}>
                                        {user.name || `ID: ${user._id}`}
                                    </span>
                                </NavLink>
                                <button
                                    type="button"
                                    className="btn btn-link ms-3 p-0"
                                    style={{ color: "#2c2c2c", textDecoration: "none" }}
                                    onClick={handleLogout}
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <NavLink 
                                to="/login" 
                                className="ms-3 d-flex align-items-center" 
                                aria-label="Login"
                                style={iconLinkStyle}
                            >
                                <i className="bi bi-person"></i>
                                <span className="ms-2" style={{ fontSize: "0.85rem", color: "#2c2c2c" }}>
                                    Login
                                </span>
                            </NavLink>
                        )}

                        {/* Cart Icon - Only show if logged in, otherwise redirect to login */}
                        {user ? (
                            <NavLink 
                                to="/cart" 
                                className="ms-3 position-relative" 
                                aria-label="Cart"
                                style={iconLinkStyle}
                            >
                                {/* Requires Bootstrap Icons (bi-bag) */}
                                <i className="bi bi-bag"></i>
                                {/* Example for a badge/counter - conditionally render this in a real app */}
                                <span 
                                    className="position-absolute top-0 start-100 translate-middle badge rounded-pill" 
                                    style={{ backgroundColor: "#ff914d", fontSize: "0.6em" }}
                                >
                                    {totalQuantity}
                                    <span className="visually-hidden">items in cart</span>
                                </span>
                            </NavLink>
                        ) : (
                            <NavLink 
                                to="/login" 
                                className="ms-3 position-relative" 
                                aria-label="Cart"
                                style={iconLinkStyle}
                            >
                                <i className="bi bi-bag"></i>
                            </NavLink>
                        )}
                    </div> {/* End of d-flex for right-aligned items */}
                </div>
            </div>
        </nav>
    );
}