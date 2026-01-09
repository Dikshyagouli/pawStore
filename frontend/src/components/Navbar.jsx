import React, { useMemo, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar() {
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

        const isAccessory = accessoryKeywords.some((k) => value.includes(k));
        const isBreedRelated = breedKeywords.some((k) => value.includes(k));

        if (isAccessory && !isBreedRelated) {
            navigate(`/accessories?search=${encodeURIComponent(value)}`);
        } else {
            navigate(`/breeds?search=${encodeURIComponent(value)}`);
        }

        setShowSuggestions(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        triggerSearch(searchTerm);
    };
    
    const iconLinkStyle = ({ isActive }) => ({
        color: isActive ? '#ff914d' : '#2c2c2c', 
        fontSize: "1.25rem", 
        marginLeft: "15px", 
        textDecoration: 'none', 
    });

    return (
        <nav className="navbar navbar-expand-lg py-3 sticky-top" style={{ backgroundColor: "#fff5ee", boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
            <div className="container-fluid container">
                
                <NavLink className="navbar-brand d-flex align-items-center" to="/" style={{ color: '#2c2c2c' }}>
                    <span style={{ fontSize: "1.5em", color: "#ff914d" }}>&#128054;</span> 
                    <span className="ms-2 fw-bold fs-5">Pawstore</span>
                </NavLink>

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
                    
                    <ul className="navbar-nav mx-auto">
                        {navItems.map((item) => (
                            <li className="nav-item" key={item.name}>
                                <NavLink 
                                    className="nav-link mx-3 fw-medium" 
                                    to={item.path} 
                                    style={({ isActive }) => ({ 
                                        color: isActive ? '#ff914d' : '#2c2c2c' 
                                    })}
                                >
                                    {item.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className="d-flex align-items-center">
                        <form className="d-flex position-relative" role="search" onSubmit={handleSearch}>
                            <div className="input-group">
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
                                <button 
                                    className="btn btn-orange-custom" 
                                    type="submit" 
                                    style={{ 
                                        backgroundColor: "#ff914d", 
                                        color: "white",
                                        borderTopRightRadius: "25px", 
                                        borderBottomRightRadius: "25px", 
                                        borderTopLeftRadius: 0, 
                                        borderBottomLeftRadius: 0, 
                                        width: "50px" 
                                    }}
                                >
                                    <i className="bi bi-search"></i>
                                </button>
                            </div>
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

                        {user ? (
                            <div className="ms-3 d-flex align-items-center">
                                {user.isAdmin && (
                                    <NavLink 
                                        to="/admin" 
                                        className="d-flex align-items-center me-3" 
                                        aria-label="Admin Dashboard"
                                        style={{ textDecoration: 'none', color: '#ff914d' }}
                                    >
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

                        {user ? (
                            <NavLink 
                                to="/cart" 
                                className="ms-3 position-relative" 
                                aria-label="Cart"
                                style={iconLinkStyle}
                            >
                                <i className="bi bi-bag"></i>
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
                    </div> 
                </div>
            </div>
        </nav>
    );
}