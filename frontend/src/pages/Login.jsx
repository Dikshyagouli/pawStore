import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const result = await login(email, password); 

        if (result.success) {
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo?.isAdmin) {
                alert('Welcome back, Admin! You can access the Admin Dashboard.');
            }
            navigate('/');
        } else {
            alert(`Login Failed: ${result.message}`);
        }
    };

    const handleGoogleLogin = () => {
        alert('Google login coming soon!');
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
                        Welcome back
                    </h1>
                    <p style={{ color: '#666', fontSize: '0.95rem' }}>
                        Welcome back! Please enter your details
                    </p>
                </div>

                <button
                    type="button"
                    onClick={handleGoogleLogin}
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
                    Log in with Google
                </button>

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
                        display: 'flex', 
                        justifyContent: 'space-between', 
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
                            Remember me
                        </label>
                        <Link 
                            to="/forgot-password" 
                            style={{ 
                                color: '#ff914d', 
                                textDecoration: 'none',
                                fontSize: '0.9rem',
                                fontWeight: '500'
                            }}
                        >
                            Forgot password?
                        </Link>
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
                        Log in
                </button>
            </form>

                <p style={{ 
                    textAlign: 'center', 
                    color: '#666', 
                    fontSize: '0.9rem',
                    marginTop: 'auto',
                    paddingTop: '2rem'
                }}>
                    Don't have an account?{' '}
                    <Link 
                        to="/signup" 
                        style={{ 
                            color: '#ff914d', 
                            textDecoration: 'none',
                            fontWeight: '600'
                        }}
                    >
                        Sign up for free
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
                        🐾🐕🐈
                    </div>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: 'bold',
                        color: '#2c2c2c',
                        marginBottom: '1.5rem',
                        lineHeight: '1.2'
                    }}>
                        We Love The Pet Like You Love The Pet
                    </h2>
                    <p style={{
                        fontSize: '1.1rem',
                        color: '#666',
                        lineHeight: '1.6'
                    }}>
                        Your one-stop destination for all your pet care needs. 
                        From premium accessories to expert advice, we're here to help 
                        you give your furry friends the best care possible.
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
                        backgroundColor: '#ff914d'
                    }}></div>
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
                        backgroundColor: '#ff914d',
                        opacity: 0.3
                    }}></div>
                </div>
            </div>
        </div>
    );
}
