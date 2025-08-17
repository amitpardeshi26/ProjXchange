import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface CartItem {
  id: string;
  project_id: string;
  user_id: string;
  created_at: string;
  project: {
    id: string;
    title: string;
    description: string;
    category: string;
    pricing: {
      sale_price: number;
      original_price: number;
      currency: string;
    };
    thumbnail?: string;
  };
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (projectId: string) => Promise<void>;
  removeFromCart: (projectId: string) => Promise<void>;
  isInCart: (projectId: string) => boolean;
  loading: boolean;
  fetchCart: () => Promise<void>;
  getTotalPrice: () => number;
  getItemCount: () => number;
  clearCart: () => Promise<void>;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const fetchCart = async () => {
    if (!isAuthenticated || !user) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://projxchange-backend-v1.vercel.app/cart', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCartItems(data.cart || []);
      }
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (projectId: string) => {
    if (!isAuthenticated || !user) {
      toast.error('Please login to add items to cart');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://projxchange-backend-v1.vercel.app/cart', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ project_id: projectId })
      });

      if (response.ok) {
        await fetchCart();
        toast.success('Added to cart!');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add to cart');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Failed to add to cart');
    }
  };

  const removeFromCart = async (projectId: string) => {
    if (!isAuthenticated || !user) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://projxchange-backend-v1.vercel.app/cart/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await fetchCart();
        toast.success('Removed from cart');
      } else {
        toast.error('Failed to remove from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      toast.error('Failed to remove from cart');
    }
  };

  const clearCart = async () => {
    if (!isAuthenticated || !user) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://projxchange-backend-v1.vercel.app/cart/clear', {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        setCartItems([]);
        toast.success('Cart cleared');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      toast.error('Failed to clear cart');
    }
  };

  const isInCart = (projectId: string) => {
    return cartItems.some(item => item.project_id === projectId);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.project.pricing.sale_price, 0);
  };

  const getItemCount = () => {
    return cartItems.length;
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchCart();
    } else {
      setCartItems([]);
    }
  }, [isAuthenticated, user]);

  const value: CartContextType = {
    cartItems,
    addToCart,
    removeFromCart,
    isInCart,
    loading,
    fetchCart,
    getTotalPrice,
    getItemCount,
    clearCart
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};