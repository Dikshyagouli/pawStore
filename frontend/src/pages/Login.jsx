import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const { login } = useAuth();
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
                        <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2c2c2c' }}>PAWSTORE</span>
                    </div>
                    <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2c2c2c', marginBottom: '0.5rem' }}>
                        Welcome back
                    </h1>
                    <p style={{ color: '#666', fontSize: '0.95rem' }}>
                        Welcome back! Please enter your details
                    </p>
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
                            color: '#5c361eff', 
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
