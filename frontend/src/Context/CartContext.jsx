import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

const EXPIRATION_TIME = 2 * 24 * 60 * 60 * 1000;

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
 
    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        const storedExpiry = localStorage.getItem('cartExpiresAt');

        const now = new Date().getTime();

        if (storedCart && storedExpiry) {
            if (now < parseInt(storedExpiry, 10)) {
                setCart(JSON.parse(storedCart));
            } else {
                localStorage.removeItem('cart');
                localStorage.removeItem('cartExpiresAt');
            }
        }
    }, []);

    useEffect(() => {
        if (cart.length > 0) {
            localStorage.setItem('cart', JSON.stringify(cart));
            localStorage.setItem('cartExpiresAt', (Date.now() + EXPIRATION_TIME).toString());
        } else {
            localStorage.removeItem('cart');
            localStorage.removeItem('cartExpiresAt');
        }
    }, [cart]);

    const addToCart = (item, quantity = 1) => {
        const updatedCart = [...cart];
        const itemIndex = updatedCart.findIndex(cartItem => cartItem._id === item._id);

        if (itemIndex > -1) {
            updatedCart[itemIndex].quantity += quantity;
        } else {
            updatedCart.push({ ...item, quantity });
        }

        setCart(updatedCart);
    };

    const incrementQuantity = (itemId) => {
        const updatedCart = cart.map(item =>
            item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        );
        setCart(updatedCart);
    };

    const decrementQuantity = (itemId) => {
        const updatedCart = cart.map(item =>
            item._id === itemId && item.quantity > 1
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCart(updatedCart);
    };

    const removeFromCart = (itemId) => {
        setCart(cart.filter(item => item._id !== itemId));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, incrementQuantity, decrementQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
