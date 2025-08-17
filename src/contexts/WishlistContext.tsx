import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

interface WishlistItem {
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

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (projectId: string) => Promise<void>;
  removeFromWishlist: (projectId: string) => Promise<void>;
  isInWishlist: (projectId: string) => boolean;
  loading: boolean;
  fetchWishlist: () => Promise<void>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const fetchWishlist = async () => {
    if (!isAuthenticated || !user) return;

    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('https://projxchange-backend-v1.vercel.app/wishlist', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setWishlistItems(data.wishlist || []);
      }
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToWishlist = async (projectId: string) => {
    if (!isAuthenticated || !user) {
      toast.error('Please login to add items to wishlist');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('https://projxchange-backend-v1.vercel.app/wishlist', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ project_id: projectId })
      });

      if (response.ok) {
        await fetchWishlist();
        toast.success('Added to wishlist!');
      } else {
        const error = await response.json();
        toast.error(error.message || 'Failed to add to wishlist');
      }
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      toast.error('Failed to add to wishlist');
    }
  };

  const removeFromWishlist = async (projectId: string) => {
    if (!isAuthenticated || !user) return;

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`https://projxchange-backend-v1.vercel.app/wishlist/${projectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        await fetchWishlist();
        toast.success('Removed from wishlist');
      } else {
        toast.error('Failed to remove from wishlist');
      }
    } catch (error) {
      console.error('Error removing from wishlist:', error);
      toast.error('Failed to remove from wishlist');
    }
  };

  const isInWishlist = (projectId: string) => {
    return wishlistItems.some(item => item.project_id === projectId);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchWishlist();
    } else {
      setWishlistItems([]);
    }
  }, [isAuthenticated, user]);

  const value: WishlistContextType = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    loading,
    fetchWishlist
  };

  return <WishlistContext.Provider value={value}>{children}</WishlistContext.Provider>;
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};