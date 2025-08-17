import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Trash2, Star, Eye } from 'lucide-react';
import { useWishlist } from '../contexts/WishlistContext';
import { useCart } from '../contexts/CartContext';
import { motion } from 'framer-motion';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, loading } = useWishlist();
  const { addToCart, isInCart } = useCart();

  const handleAddToCart = async (projectId: string) => {
    await addToCart(projectId);
  };

  const handleRemoveFromWishlist = async (projectId: string) => {
    await removeFromWishlist(projectId);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading your wishlist...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 animate-slideInDown">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-pink-100 to-red-100 text-pink-700 rounded-full text-sm font-bold mb-6">
            <Heart className="w-4 h-4 mr-2" />
            Your Favorite Projects
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            My Wishlist
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Keep track of projects you love and want to purchase later
          </p>
        </div>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 animate-slideInUp">
            <div className="w-24 h-24 bg-gradient-to-br from-pink-100 to-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-pink-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h3>
            <p className="text-gray-600 text-lg mb-8">Start exploring projects and add your favorites here!</p>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <Eye className="w-5 h-5" />
              Browse Projects
            </Link>
          </div>
        ) : (
          <>
            {/* Stats */}
            <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-8 border border-white/20 animate-slideInUp">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {wishlistItems.length} Project{wishlistItems.length !== 1 ? 's' : ''} in Wishlist
                  </h2>
                  <p className="text-gray-600">
                    Total value: ₹{wishlistItems.reduce((total, item) => total + item.project.pricing.sale_price, 0)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Potential savings</p>
                  <p className="text-lg font-bold text-green-600">
                    ₹{wishlistItems.reduce((total, item) => 
                      total + (item.project.pricing.original_price - item.project.pricing.sale_price), 0
                    )}
                  </p>
                </div>
              </div>
            </div>

            {/* Wishlist Items */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white/90 backdrop-blur-lg rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-white/20 group"
                >
                  <div className="relative">
                    <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-teal-100 flex items-center justify-center">
                      {item.project.thumbnail ? (
                        <img 
                          src={item.project.thumbnail} 
                          alt={item.project.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-6xl">📁</div>
                      )}
                    </div>
                    
                    {/* Remove from wishlist button */}
                    <button
                      onClick={() => handleRemoveFromWishlist(item.project_id)}
                      className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-2 hover:bg-red-100 hover:scale-110 transition-all duration-300 shadow-lg group/remove"
                      title="Remove from wishlist"
                    >
                      <Heart className="w-5 h-5 text-red-500 fill-current group-hover/remove:scale-125 transition-transform duration-300" />
                    </button>

                    {/* Discount badge */}
                    {item.project.pricing.original_price > item.project.pricing.sale_price && (
                      <div className="absolute top-4 left-4 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        {Math.round((1 - item.project.pricing.sale_price / item.project.pricing.original_price) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-semibold">
                        {item.project.category}
                      </span>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="ml-1 text-sm font-semibold text-gray-700">4.8</span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300">
                      {item.project.title}
                    </h3>

                    <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                      {item.project.description}
                    </p>

                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-gray-900">₹{item.project.pricing.sale_price}</span>
                        {item.project.pricing.original_price > item.project.pricing.sale_price && (
                          <span className="text-lg text-gray-500 line-through">₹{item.project.pricing.original_price}</span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500">
                        Added {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Link
                        to={`/project/${item.project_id}`}
                        className="flex-1 text-center px-4 py-2 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                      >
                        View Details
                      </Link>
                      <button
                        onClick={() => handleAddToCart(item.project_id)}
                        disabled={isInCart(item.project_id)}
                        className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                          isInCart(item.project_id)
                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-600 to-teal-600 text-white hover:from-blue-700 hover:to-teal-700 shadow-lg hover:shadow-xl hover:scale-105'
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {isInCart(item.project_id) ? 'In Cart' : 'Add to Cart'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Wishlist;