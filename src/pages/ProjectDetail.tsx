import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, Download, Play, Lock, ShoppingCart, Heart, Share2, Eye, Calendar, User, Award, Clock, Shield, CheckCircle, Code, GitBranch, Users, Zap, BookOpen, ExternalLink, Copy, ChevronRight, ArrowLeft } from 'lucide-react';

const ProjectDetail = () => {
  const { id } = useParams();
  const [isPurchased, setIsPurchased] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock project data - in real app, fetch based on ID
  const project = {
    id: parseInt(id || '1'),
    title: 'E-commerce Web Application',
    category: 'React',
    price: 29,
    originalPrice: 49,
    rating: 4.9,
    reviews: 45,
    likes: 234,
    views: 1250,
    thumbnail: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
    seller: {
      name: 'John Doe',
      avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150',
      rating: 4.9,
      totalProjects: 12,
      joinedDate: '2023-06-15',
      level: 'Top Rated',
      responseTime: '1 hour',
      completionRate: '98%',
      followers: 1250
    },
    description: 'A complete e-commerce solution built with React and Node.js. This project includes everything you need to build a modern online store with user authentication, shopping cart, payment integration, and admin dashboard. Perfect for learning modern web development practices and building your portfolio.',
    features: [
      'User Registration & Authentication',
      'Product Catalog with Categories',
      'Shopping Cart & Checkout',
      'Payment Integration (Stripe)',
      'Admin Dashboard',
      'Order Management',
      'Responsive Design',
      'Email Notifications',
      'Search & Filtering',
      'Product Reviews & Ratings',
      'Inventory Management',
      'Analytics Dashboard'
    ],
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'Bootstrap', 'Redux'],
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    githubUrl: 'https://github.com/johndoe/ecommerce-app',
    liveDemo: 'https://ecommerce-demo.vercel.app',
    deliveryTime: '2 days',
    revisions: '3 revisions',
    sales: 89,
    githubStars: 156,
    difficulty: 'Intermediate',
    lastUpdated: '2024-01-15',
    instructions: isPurchased ? `
# E-commerce Web Application Setup

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed
- MongoDB installed and running
- Stripe account for payment processing

### Installation Steps

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd ecommerce-app
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   # Backend
   cd backend
   npm install
   
   # Frontend
   cd ../frontend
   npm install
   \`\`\`

3. **Environment Setup**
   Create .env file in backend directory:
   \`\`\`
   MONGODB_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your-jwt-secret
   STRIPE_SECRET_KEY=your-stripe-secret
   \`\`\`

4. **Run the application**
   \`\`\`bash
   # Backend (port 5000)
   cd backend
   npm start
   
   # Frontend (port 3000)
   cd frontend
   npm start
   \`\`\`

## 📋 Features Overview

### User Features
- User registration and login
- Browse products by category
- Add products to cart
- Secure checkout with Stripe
- Order history and tracking

### Admin Features
- Add/Edit/Delete products
- Manage orders
- View analytics
- User management

## 🔧 Customization Guide

### Styling
- CSS files are located in \`src/styles/\`
- Bootstrap classes are used throughout
- Custom variables in \`src/styles/variables.css\`

### Adding New Features
1. Create new components in \`src/components/\`
2. Add routes in \`src/App.js\`
3. Update API endpoints in \`src/services/\`

## 🐛 Troubleshooting

### Common Issues
1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env

2. **Stripe Payment Fails**
   - Verify Stripe keys in .env
   - Check Stripe webhook configuration

## 📞 Support
For questions or issues, contact through the platform.
    ` : 'Purchase this project to unlock detailed setup instructions and documentation.',
    screenshots: [
      'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=600',
      'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600'
    ],
    dateAdded: '2024-01-15',
    trending: true,
    featured: true
  };

  const handlePurchase = () => {
    setIsPurchased(true);
    alert('Project purchased successfully! You can now access all files and instructions.');
  };

  const relatedProjects = [
    {
      id: 2,
      title: 'React Task Manager',
      price: 22,
      originalPrice: 35,
      rating: 4.6,
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'React'
    },
    {
      id: 3,
      title: 'Social Media Dashboard',
      price: 35,
      originalPrice: 55,
      rating: 4.7,
      thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Python'
    },
    {
      id: 4,
      title: 'Mobile Banking App',
      price: 40,
      originalPrice: 60,
      rating: 4.5,
      thumbnail: 'https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg?auto=compress&cs=tinysrgb&w=300',
      category: 'Mobile'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Sticky Navigation */}
      <div className={`sticky top-0 z-40 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/projects" 
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors duration-200 font-medium"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Projects
            </Link>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-500 transition-all duration-200 rounded-xl hover:bg-red-50 hover:scale-105">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">{project.likes}</span>
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-blue-500 transition-all duration-200 rounded-xl hover:bg-blue-50 hover:scale-105">
                <Share2 className="w-5 h-5" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Hero Section */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl mb-8 border border-white/30 animate-slideInLeft">
              {/* Badges */}
              <div className="flex flex-wrap items-center gap-3 mb-6 animate-slideInUp">
                <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-teal-100 text-blue-700 rounded-full text-sm font-bold shadow-sm">
                  {project.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                  project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-red-100 text-red-700'
                }`}>
                  {project.difficulty}
                </span>
                {project.featured && (
                  <span className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 rounded-full text-sm font-bold flex items-center shadow-sm animate-pulse">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </span>
                )}
                {project.trending && (
                  <span className="px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full text-sm font-bold flex items-center shadow-sm animate-bounce">
                    <Zap className="w-3 h-3 mr-1" />
                    Trending
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 animate-slideInUp" style={{ animationDelay: '200ms' }}>
                {project.title}
              </h1>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-8 animate-slideInUp" style={{ animationDelay: '300ms' }}>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-lg text-gray-900">{project.rating}</span>
                  <span className="font-medium">({project.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  <span className="font-medium">{project.views} views</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  <span className="font-medium">{project.likes} likes</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5" />
                  <span className="font-medium">{project.sales} sales</span>
                </div>
                <div className="flex items-center gap-2">
                  <Code className="w-5 h-5" />
                  <span className="font-medium">{project.githubStars} stars</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4 mb-8 animate-slideInUp" style={{ animationDelay: '400ms' }}>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <GitBranch className="w-5 h-5" />
                  View on GitHub
                </a>
                <a
                  href={project.liveDemo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </a>
                <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                  <Star className="w-5 h-5" />
                  Star Project
                </button>
              </div>

              {/* Video */}
              <div className="aspect-video bg-gray-900 rounded-2xl overflow-hidden mb-8 shadow-2xl animate-slideInUp hover:shadow-3xl transition-shadow duration-300" style={{ animationDelay: '500ms' }}>
                <iframe
                  src={project.videoUrl}
                  title="Project Demo"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/30 animate-slideInUp" style={{ animationDelay: '600ms' }}>
              <div className="border-b border-gray-200">
                <nav className="flex space-x-8 px-8">
                  {[
                    { id: 'description', label: 'Overview', icon: BookOpen },
                    { id: 'features', label: 'Features', icon: CheckCircle },
                    { id: 'instructions', label: 'Setup Guide', icon: Code },
                    { id: 'screenshots', label: 'Screenshots', icon: Eye }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 py-6 px-2 border-b-2 font-semibold text-sm transition-all duration-300 ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600 scale-105'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:scale-105'
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-8 min-h-[500px]">
                {activeTab === 'description' && (
                  <div className="animate-slideInUp">
                    <h3 className="text-3xl font-bold mb-6 text-gray-900">About This Project</h3>
                    <p className="text-gray-700 leading-relaxed mb-8 text-lg">{project.description}</p>
                    
                    <h4 className="text-2xl font-bold mb-6 text-gray-900">Technology Stack</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                      {project.techStack.map((tech, index) => (
                        <div key={index} className="bg-gradient-to-br from-blue-50 to-teal-50 p-4 rounded-xl border border-blue-100 hover:shadow-lg hover:scale-105 transition-all duration-300 text-center animate-slideInUp" style={{ animationDelay: `${index * 100}ms` }}>
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                            <Code className="w-6 h-6 text-white" />
                          </div>
                          <span className="text-blue-800 font-semibold text-sm">{tech}</span>
                        </div>
                      ))}
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl p-6 border border-blue-100">
                      <h4 className="text-xl font-bold mb-4 text-gray-900">Project Highlights</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700 font-medium">Production Ready</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                            <Shield className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700 font-medium">Secure & Tested</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                            <Zap className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700 font-medium">High Performance</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                            <Users className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-700 font-medium">Well Documented</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="animate-slideInUp">
                    <h3 className="text-3xl font-bold mb-6 text-gray-900">Key Features</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {project.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl border border-blue-100 hover:shadow-lg hover:scale-105 transition-all duration-300 animate-slideInUp" style={{ animationDelay: `${index * 80}ms` }}>
                          <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <CheckCircle className="w-4 h-4 text-white" />
                          </div>
                          <span className="text-gray-800 font-medium">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'instructions' && (
                  <div className="animate-slideInUp">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-3xl font-bold text-gray-900">Setup Instructions</h3>
                      {!isPurchased && (
                        <div className="flex items-center gap-2 text-gray-500 bg-gray-100 px-4 py-2 rounded-xl">
                          <Lock className="w-5 h-5" />
                          <span className="font-medium">Purchase to unlock</span>
                        </div>
                      )}
                    </div>
                    <div className={`${!isPurchased ? 'filter blur-sm' : ''} transition-all duration-300`}>
                      <div className="bg-gray-900 rounded-2xl p-8 font-mono text-sm shadow-2xl hover:shadow-3xl transition-shadow duration-300 relative">
                        {isPurchased && (
                          <button className="absolute top-4 right-4 p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors duration-200">
                            <Copy className="w-4 h-4 text-gray-300" />
                          </button>
                        )}
                        <pre className="whitespace-pre-wrap text-green-400 leading-relaxed">
                          {project.instructions}
                        </pre>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'screenshots' && (
                  <div className="animate-slideInUp">
                    <h3 className="text-3xl font-bold mb-6 text-gray-900">Project Screenshots</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      {project.screenshots.map((screenshot, index) => (
                        <div key={index} className="group aspect-video bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-500 animate-slideInUp" style={{ animationDelay: `${index * 100}ms` }}>
                          <img 
                            src={screenshot} 
                            alt={`Screenshot ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <Eye className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Purchase Card */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl sticky top-24 border border-white/30 animate-slideInRight">
              <div className="text-center mb-8">
                <div className="flex items-center justify-center gap-3 mb-4">
                  <div className="text-4xl font-bold text-gray-900">${project.price}</div>
                  <div className="text-2xl text-gray-500 line-through">${project.originalPrice}</div>
                </div>
                <div className="text-sm text-green-600 font-semibold bg-green-100 px-4 py-2 rounded-full inline-block animate-pulse">
                  Save ${project.originalPrice - project.price} ({Math.round((1 - project.price / project.originalPrice) * 100)}% OFF)
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    Delivery Time
                  </span>
                  <span className="font-semibold text-gray-900">{project.deliveryTime}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Revisions</span>
                  <span className="font-semibold text-gray-900">{project.revisions}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Total Sales</span>
                  <span className="font-semibold text-gray-900">{project.sales}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Updated</span>
                  <span className="font-semibold text-gray-900">{new Date(project.lastUpdated).toLocaleDateString()}</span>
                </div>
              </div>

              {!isPurchased ? (
                <button
                  onClick={handlePurchase}
                  className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-teal-700 transition-all duration-300 flex items-center justify-center gap-3 mb-6 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <ShoppingCart className="w-6 h-6" />
                  Get This Project (${project.price})
                </button>
              ) : (
                <div className="space-y-4 mb-6">
                  <div className="text-center text-green-600 font-bold text-lg mb-4 bg-green-100 py-3 rounded-xl">
                    ✅ Project Purchased
                  </div>
                  <button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold text-lg hover:from-green-700 hover:to-emerald-700 transition-all duration-300 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105">
                    <Download className="w-6 h-6" />
                    Download Files
                  </button>
                </div>
              )}

              <div className="space-y-3 text-center text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Lifetime access</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Source code included</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Documentation provided</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Money-back guarantee</span>
                </div>
              </div>
            </div>

            {/* Seller Info */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 animate-slideInRight" style={{ animationDelay: '200ms' }}>
              <h3 className="text-xl font-bold mb-6">About the Creator</h3>
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src={project.seller.avatar} 
                  alt={project.seller.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-blue-100 hover:ring-blue-200 transition-all duration-300"
                />
                <div>
                  <h4 className="font-bold text-gray-900 text-lg">{project.seller.name}</h4>
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="font-semibold">{project.seller.rating}</span>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 rounded-full text-xs font-bold">
                    {project.seller.level}
                  </span>
                </div>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Projects</span>
                  <span className="font-semibold text-gray-900">{project.seller.totalProjects}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Followers</span>
                  <span className="font-semibold text-gray-900">{project.seller.followers}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Time</span>
                  <span className="font-semibold text-gray-900">{project.seller.responseTime}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Completion Rate</span>
                  <span className="font-semibold text-green-600">{project.seller.completionRate}</span>
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button className="flex-1 bg-gray-100 text-gray-800 py-3 rounded-xl font-semibold hover:bg-gray-200 hover:scale-105 transition-all duration-200">
                  Contact
                </button>
                <button className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 hover:scale-105 transition-all duration-200">
                  Follow
                </button>
              </div>
            </div>

            {/* Related Projects */}
            <div className="bg-white/90 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/30 animate-slideInRight" style={{ animationDelay: '400ms' }}>
              <h3 className="text-xl font-bold mb-6">Related Projects</h3>
              <div className="space-y-6">
                {relatedProjects.map((relatedProject, idx) => (
                  <Link 
                    key={relatedProject.id}
                    to={`/project/${relatedProject.id}`}
                    className="flex gap-4 p-4 rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 group"
                  >
                    <img 
                      src={relatedProject.thumbnail} 
                      alt={relatedProject.title}
                      className="w-20 h-16 object-cover rounded-lg group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 text-sm mb-2 group-hover:text-blue-600 transition-colors duration-300">{relatedProject.title}</h4>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600 font-medium">{relatedProject.rating}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-gray-900">${relatedProject.price}</span>
                          <span className="text-xs text-gray-500 line-through">${relatedProject.originalPrice}</span>
                        </div>
                      </div>
                      <span className="text-xs text-blue-600 font-medium">{relatedProject.category}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-blue-600 transition-colors duration-300" />
                  </Link>
                ))}
              </div>
              <Link 
                to="/projects"
                className="block text-center mt-6 text-blue-600 hover:text-blue-700 font-semibold text-sm"
              >
                View All Projects →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;