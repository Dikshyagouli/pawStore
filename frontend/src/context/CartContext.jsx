import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext.jsx';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const API_URL = 'http://localhost:5000/api/cart';

export const CartProvider = ({ children }) => {
    const { user, isLoggedIn } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isLoggedIn && user?.token) {
            fetchCart();
        } else {
            setCartItems([]);
        }
    }, [isLoggedIn, user]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_URL}`, {
                headers: { 'Authorization': `Bearer ${user.token}` },
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

    const addItem = async (product) => {
        if (!isLoggedIn) return { success: false, message: 'Please login first' };
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    productId: product.id,
                    name: product.name,
                    price: product.price,
                    quantity: 1,
                    image: product.img
                }),
            });
            if (response.ok) {
                fetchCart();
                return { success: true };
            }
        } catch (error) {
            return { success: false, message: 'Server error' };
        }
    };

    const increaseQuantity = async (itemId) => {
        const item = cartItems.find(i => i._id === itemId);
        if (!item) return;
        
        const newQuantity = item.quantity + 1;
        updateBackendQuantity(itemId, newQuantity);
    };

    const decreaseQuantity = async (itemId) => {
        const item = cartItems.find(i => i._id === itemId);
        if (!item) return;

        const newQuantity = item.quantity - 1;
        if (newQuantity <= 0) {
            removeItem(itemId);
        } else {
            updateBackendQuantity(itemId, newQuantity);
        }
    };

    const updateBackendQuantity = async (itemId, quantity) => {
        try {
            const response = await fetch(`${API_URL}/${itemId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${user.token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });
            if (response.ok) {
                const cart = await response.json();
                setCartItems(cart.items || []);
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const removeItem = async (itemId) => {
        try {
            const response = await fetch(`${API_URL}/${itemId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${user.token}` },
            });
            if (response.ok) fetchCart();
        } catch (error) {
            console.error('Error removing item:', error);
        }
    };

    const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

    return (
        <CartContext.Provider value={{ cartItems, totalQuantity, addItem, removeItem, increaseQuantity, decreaseQuantity, loading }}>
            {children}
        </CartContext.Provider>
    );
};