// src/pages/SignUp.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isAdminSignup, setIsAdminSignup] = useState(false);
    const [adminKey, setAdminKey] = useState('');
    const { signup, signupAdmin, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let result;
        if (isAdminSignup) {
            if (!adminKey) {
                alert('Please enter admin key');
                return;
            }
            result = await signupAdmin(name, email, password, adminKey);
        } else {
            result = await signup(name, email, password);
        }

        if (result.success) {
            navigate('/');
        } else {
            alert(`Sign Up Failed: ${result.message}`);
        }
    };

    const handleGoogleSignup = () => {
        // Placeholder for Google OAuth - can be implemented later
        alert('Google signup coming soon!');
    };

    return (
        <div style={{ minHeight: '100vh', display: 'flex', backgroundColor: '#fff5ee' }}>
            <div style={{ 
                flex: '1', 
                backgroundColor: 'white', 
                display: 'flex', 
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '3rem',
                maxWidth: '600px'
            }}>
                <div style={{ marginBottom: '3rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                        <span style={{ fontSize: '2rem' }}>🐾</span>
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c2c2c' }}>PAWSTORE</span>
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c2c2c', marginBottom: '0.5rem' }}>
                        Create an account
                    </h1>
                    <p style={{ color: '#666', fontSize: '0.95rem' }}>
                        Join us today! Please enter your details to get started
                    </p>
                </div>
                <button
                    type="button"
                    onClick={handleGoogleSignup}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #e0e0e0',
                        borderRadius: '8px',
                        backgroundColor: 'white',
                        color: '#2c2c2c',
                        fontSize: '0.95rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        marginBottom: '1.5rem',
                        transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => {
                        e.target.style.borderColor = '#ff914d';
                        e.target.style.backgroundColor = '#fff5ee';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.borderColor = '#e0e0e0';
                        e.target.style.backgroundColor = 'white';
                    }}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Sign up with Google
                </button>

                {/* Divider */}
                <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '1.5rem',
                    gap: '1rem'
                }}>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
                    <span style={{ color: '#666', fontSize: '0.9rem' }}>or</span>
                    <div style={{ flex: 1, height: '1px', backgroundColor: '#e0e0e0' }}></div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.25rem' }}>
                        <label htmlFor="name" style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#2c2c2c',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>
                            Full Name
                        </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#ff914d'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label htmlFor="email" style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#2c2c2c',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>
                            Email
                        </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#ff914d'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                </div>

                    <div style={{ marginBottom: '1.25rem' }}>
                        <label htmlFor="password" style={{ 
                            display: 'block', 
                            marginBottom: '0.5rem', 
                            color: '#2c2c2c',
                            fontSize: '0.9rem',
                            fontWeight: '500'
                        }}>
                            Password
                        </label>
                    <input
                        type="password"
                        id="password"
                            value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                            style={{
                                width: '100%',
                                padding: '0.75rem',
                                border: '1px solid #e0e0e0',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                outline: 'none',
                                transition: 'border-color 0.2s'
                            }}
                            onFocus={(e) => e.target.style.borderColor = '#ff914d'}
                            onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                    />
                </div>

                    <div style={{ 
                        marginBottom: '1.25rem',
                        padding: '1rem',
                        backgroundColor: '#fff5ee',
                        borderRadius: '8px',
                        border: '1px solid #ffe8da'
                    }}>
                        <label style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem',
                            color: '#2c2c2c',
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            marginBottom: isAdminSignup ? '1rem' : '0'
                        }}>
                            <input
                                type="checkbox"
                                checked={isAdminSignup}
                                onChange={(e) => setIsAdminSignup(e.target.checked)}
                                style={{ cursor: 'pointer' }}
                            />
                            <span style={{ fontWeight: '600' }}>Sign up as Admin</span>
                        </label>
                        {isAdminSignup && (
                            <div>
                                <label htmlFor="adminKey" style={{ 
                                    display: 'block', 
                                    marginBottom: '0.5rem', 
                                    color: '#2c2c2c',
                                    fontSize: '0.9rem',
                                    fontWeight: '500'
                                }}>
                                    Admin Key
                                </label>
                                <input
                                    type="password"
                                    id="adminKey"
                                    value={adminKey}
                                    onChange={(e) => setAdminKey(e.target.value)}
                                    placeholder="Enter admin key"
                                    required={isAdminSignup}
                                    style={{
                                        width: '100%',
                                        padding: '0.75rem',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: '8px',
                                        fontSize: '0.95rem',
                                        outline: 'none',
                                        transition: 'border-color 0.2s'
                                    }}
                                    onFocus={(e) => e.target.style.borderColor = '#ff914d'}
                                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                                />
                                <small style={{ color: '#666', fontSize: '0.85rem', display: 'block', marginTop: '0.25rem' }}>
                                    Contact system administrator for admin key
                                </small>
                            </div>
                        )}
                    </div>

                    <div style={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        marginBottom: '1.5rem'
                    }}>
                        <label style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            gap: '0.5rem',
                            color: '#2c2c2c',
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                        }}>
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                style={{ cursor: 'pointer' }}
                            />
                            I agree to the Terms and Conditions
                        </label>
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '0.75rem',
                            backgroundColor: '#2c2c2c',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            cursor: 'pointer',
                            transition: 'background-color 0.2s',
                            marginBottom: '1.5rem'
                        }}
                        onMouseOver={(e) => e.target.style.backgroundColor = '#ff914d'}
                        onMouseOut={(e) => e.target.style.backgroundColor = '#2c2c2c'}
                    >
                        {isAdminSignup ? 'Sign up as Admin' : 'Sign up'}
                </button>
            </form>

                <p style={{ 
                    textAlign: 'center', 
                    color: '#666', 
                    fontSize: '0.9rem',
                    marginTop: 'auto',
                    paddingTop: '2rem'
                }}>
                    Already have an account?{' '}
                    <Link 
                        to="/login" 
                        style={{ 
                            color: '#ff914d', 
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Log in
                    </Link>
                </p>
            </div>

            <div style={{ 
                flex: '1', 
                backgroundColor: '#ffe8da',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: '20%',
                    right: '10%',
                    width: '100px',
                    height: '100px',
                    backgroundColor: '#ff914d',
                    borderRadius: '50%',
                    opacity: 0.1
                }}></div>
                <div style={{
                    position: 'absolute',
                    bottom: '15%',
                    left: '10%',
                    width: '80px',
                    height: '80px',
                    backgroundColor: '#ff914d',
                    borderRadius: '50%',
                    opacity: 0.1
                }}></div>

                <div style={{
                    textAlign: 'center',
                    zIndex: 1,
                    maxWidth: '500px'
                }}>
                    <div style={{
                        fontSize: '8rem',
                        marginBottom: '2rem',
                        filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))'
                    }}>
                    </div>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#2c2c2c',
                        marginBottom: '1.5rem',
                        lineHeight: '1.2'
                    }}>
                        Join Our Pet Care Community
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        lineHeight: '1.6'
                    }}>
                        Start your journey with us and discover a world of premium pet products, 
                        expert care advice, and a community that loves pets as much as you do. 
                        Sign up today and give your furry friend the best!
                    </p>
                </div>

                <div style={{
                    position: 'absolute',
                    bottom: '2rem',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    display: 'flex',
                    gap: '0.5rem'
                }}>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#ff914d',
                        opacity: 0.3
                    }}></div>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#ff914d'
                    }}></div>
                    <div style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#ff914d',
                        opacity: 0.3
                    }}></div>
                </div>
            </div>
        </div>
    );
}
