// src/context/CartContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext();

export const useCart = () => {
    return useContext(CartContext);
};

const API_URL = 'http://localhost:5000/api/cart';

export const CartProvider = ({ children }) => {
    const { user, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    // Fetch cart from backend when user logs in
    useEffect(() => {
        if (isLoggedIn && user?.token) {
            fetchCart();
        } else {
            // Clear cart when user logs out
            setCartItems([]);
        }
    }, [isLoggedIn, user]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const cart = await response.json();
                setCartItems(cart.items || []);
            }
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const addItem = async (item) => {
        if (!isLoggedIn) {
            alert('Please login or register to add items to cart');
            navigate('/login');
            return { success: false, message: 'Please login first' };
        }

        try {
            const response = await fetch(`${API_URL}`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: item.id.toString(),
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity || 1,
                }),
            });

            if (response.ok) {
                const cart = await response.json();
                setCartItems(cart.items || []);
                return { success: true };
            } else {
                const data = await response.json();
                return { success: false, message: data.message || 'Failed to add item' };
            }
        } catch (error) {
            console.error('Error adding to cart:', error);
            return { success: false, message: 'Network error' };
        }
    };

    const removeItem = async (itemId) => {
        if (!isLoggedIn) return;

        try {
            const response = await fetch(`${API_URL}/${itemId}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const cart = await response.json();
                setCartItems(cart.items || []);
            }
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const increaseQuantity = async (itemId) => {
        if (!isLoggedIn) return;

        const item = cartItems.find(i => i._id === itemId);
        if (!item) return;

        try {
            const response = await fetch(`${API_URL}/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity: item.quantity + 1 }),
            });

            if (response.ok) {
                const cart = await response.json();
                setCartItems(cart.items || []);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const decreaseQuantity = async (itemId) => {
        if (!isLoggedIn) return;

        const item = cartItems.find(i => i._id === itemId);
        if (!item) return;

        const newQuantity = item.quantity - 1;

        try {
            if (newQuantity <= 0) {
                // Remove item if quantity becomes 0
                await removeItem(itemId);
            } else {
                const response = await fetch(`${API_URL}/${itemId}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${user.token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ quantity: newQuantity }),
                });

                if (response.ok) {
                    const cart = await response.json();
                    setCartItems(cart.items || []);
                }
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    const value = {
        cartItems,
        totalQuantity,
        addItem,
        removeItem,
        increaseQuantity,
        decreaseQuantity,
        loading,
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
