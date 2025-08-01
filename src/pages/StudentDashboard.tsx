import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Star, Calendar, Settings, User, ShoppingBag, Heart, Eye, Award, TrendingUp, Clock, Edit, Trash2, Plus, BarChart3, Users, DollarSign } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const myProjects = [
    {
      id: 1,
      title: 'E-commerce Web Application',
      category: 'React',
      status: 'published',
      views: 1250,
      stars: 89,
      likes: 234,
      uploadDate: '2024-01-15',
      thumbnail: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
      techStack: ['React', 'Node.js', 'MongoDB'],
      earnings: 145
    },
    {
      id: 2,
      title: 'Task Management Dashboard',
      category: 'Vue.js',
      status: 'pending',
      views: 0,
      stars: 0,
      likes: 0,
      uploadDate: '2024-01-20',
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      techStack: ['Vue.js', 'Firebase', 'Tailwind'],
      earnings: 0
    },
    {
      id: 3,
      title: 'Mobile Banking App',
      category: 'React Native',
      status: 'published',
      views: 890,
      stars: 67,
      likes: 156,
      uploadDate: '2024-01-10',
      thumbnail: 'https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg?auto=compress&cs=tinysrgb&w=400',
      techStack: ['React Native', 'Node.js', 'PostgreSQL'],
      earnings: 89
    }
  ];

  const purchasedProjects = [
    {
      id: 1,
      title: 'Social Media Dashboard',
      category: 'Python',
      price: 35,
      purchaseDate: '2024-01-18',
      thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Mike Johnson'
    },
    {
      id: 2,
      title: 'Hospital Management System',
      category: 'Java',
      price: 45,
      purchaseDate: '2024-01-12',
      thumbnail: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: 'Sarah Wilson'
    }
  ];

  const userStats = {
    totalProjects: myProjects.length,
    totalViews: myProjects.reduce((sum, p) => sum + p.views, 0),
    totalStars: myProjects.reduce((sum, p) => sum + p.stars, 0),
    totalEarnings: myProjects.reduce((sum, p) => sum + p.earnings, 0),
    projectsPurchased: purchasedProjects.length,
    totalSpent: purchasedProjects.reduce((sum, p) => sum + p.price, 0)
  };

  const recentActivity = [
    { id: 1, action: 'Project viewed', project: 'E-commerce Web Application', time: '2 hours ago', type: 'view' },
    { id: 2, action: 'New star received', project: 'Mobile Banking App', time: '5 hours ago', type: 'star' },
    { id: 3, action: 'Project purchased', project: 'Social Media Dashboard', time: '1 day ago', type: 'purchase' },
    { id: 4, action: 'Comment received', project: 'E-commerce Web Application', time: '2 days ago', type: 'comment' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="space-y-8"
        >
          {/* Header */}
          <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <motion.div 
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img 
                    src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                    alt={user?.name}
                    className="w-20 h-20 rounded-full object-cover ring-4 ring-blue-100"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Pro
                  </div>
                </motion.div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.name || 'Student'}!</h1>
                  <p className="text-gray-600 text-lg">{user?.email || 'student@example.com'}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span className="text-sm text-gray-600">Member since {new Date(user?.joinedDate || '2023-09-15').toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm font-semibold text-gray-700">4.8 avg rating</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">${userStats.totalEarnings}</div>
                <div className="text-sm text-gray-600 font-medium">Total Earnings</div>
                <div className="text-sm text-green-600 font-semibold mt-1">+$45 this month</div>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Projects', value: userStats.totalProjects, icon: ShoppingBag, color: 'from-blue-500 to-blue-600', change: '+2 this month' },
              { label: 'Total Views', value: userStats.totalViews.toLocaleString(), icon: Eye, color: 'from-purple-500 to-purple-600', change: '+15% this week' },
              { label: 'Stars Earned', value: userStats.totalStars, icon: Star, color: 'from-yellow-500 to-yellow-600', change: '+12 this week' },
              { label: 'Purchased', value: userStats.projectsPurchased, icon: Heart, color: 'from-pink-500 to-pink-600', change: 'Recent activity' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20 cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 font-medium">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-sm text-green-600 font-semibold">{stat.change}</p>
                  </div>
                  <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-2xl flex items-center justify-center`}>
                    <stat.icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-6 sticky top-8">
                <nav className="space-y-2">
                  {[
                    { id: 'overview', label: 'Overview', icon: BarChart3 },
                    { id: 'projects', label: 'My Projects', icon: ShoppingBag },
                    { id: 'purchased', label: 'Purchased', icon: Heart },
                    { id: 'activity', label: 'Activity', icon: Clock },
                    { id: 'settings', label: 'Settings', icon: Settings }
                  ].map((item) => (
                    <motion.button
                      key={item.id}
                      onClick={() => setActiveTab(item.id)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        activeTab === item.id
                          ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg'
                          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.label}
                    </motion.button>
                  ))}
                </nav>
              </div>
            </motion.div>

            {/* Content Area */}
            <motion.div variants={itemVariants} className="lg:col-span-3">
              <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-xl border border-white/20 p-8">
                {activeTab === 'overview' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
                      <Link
                        to="/upload"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <Plus className="w-4 h-4" />
                        Upload Project
                      </Link>
                    </div>

                    {/* Recent Activity */}
                    <div className="mb-8">
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Activity</h3>
                      <div className="space-y-4">
                        {recentActivity.map((activity, index) => (
                          <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                          >
                            <div className={`w-3 h-3 rounded-full ${
                              activity.type === 'view' ? 'bg-blue-500' :
                              activity.type === 'star' ? 'bg-yellow-500' :
                              activity.type === 'purchase' ? 'bg-green-500' :
                              'bg-purple-500'
                            }`} />
                            <div className="flex-1">
                              <p className="text-gray-900 font-medium">{activity.action}</p>
                              <p className="text-sm text-gray-600">{activity.project}</p>
                            </div>
                            <span className="text-sm text-gray-500">{activity.time}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h3>
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { title: 'Upload New Project', desc: 'Share your latest work', icon: Plus, color: 'from-blue-500 to-blue-600' },
                          { title: 'View Analytics', desc: 'Check project performance', icon: BarChart3, color: 'from-purple-500 to-purple-600' },
                          { title: 'Browse Projects', desc: 'Discover new projects', icon: Eye, color: 'from-green-500 to-green-600' }
                        ].map((action, index) => (
                          <motion.div
                            key={action.title}
                            whileHover={{ scale: 1.05, y: -5 }}
                            className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-2xl border border-gray-100 cursor-pointer hover:shadow-lg transition-all duration-200"
                          >
                            <div className={`w-12 h-12 bg-gradient-to-r ${action.color} rounded-xl flex items-center justify-center mb-4`}>
                              <action.icon className="w-6 h-6 text-white" />
                            </div>
                            <h4 className="font-bold text-gray-900 mb-2">{action.title}</h4>
                            <p className="text-sm text-gray-600">{action.desc}</p>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === 'projects' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center justify-between mb-8">
                      <h2 className="text-2xl font-bold text-gray-900">My Projects</h2>
                      <Link
                        to="/upload"
                        className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105"
                      >
                        <Plus className="w-4 h-4" />
                        Upload New
                      </Link>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      {myProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                          <div className="relative">
                            <img 
                              src={project.thumbnail} 
                              alt={project.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                                project.status === 'published' 
                                  ? 'bg-green-500 text-white' 
                                  : 'bg-yellow-500 text-white'
                              }`}>
                                {project.status}
                              </span>
                            </div>
                            <div className="absolute top-4 right-4 flex gap-2">
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                              >
                                <Edit className="w-4 h-4 text-gray-600" />
                              </motion.button>
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                className="p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-red-50 transition-colors"
                              >
                                <Trash2 className="w-4 h-4 text-red-600" />
                              </motion.button>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                {project.category}
                              </span>
                              <div className="text-right">
                                <div className="text-lg font-bold text-green-600">${project.earnings}</div>
                                <div className="text-xs text-gray-500">earned</div>
                              </div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {project.techStack.map((tech, techIndex) => (
                                <span 
                                  key={techIndex} 
                                  className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs font-medium"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                              <div className="flex items-center gap-4">
                                <div className="flex items-center gap-1">
                                  <Eye className="w-4 h-4" />
                                  <span>{project.views}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                  <span>{project.stars}</span>
                                </div>
                                <div className="flex items-center gap-1">
                                  <Heart className="w-4 h-4 text-red-400 fill-current" />
                                  <span>{project.likes}</span>
                                </div>
                              </div>
                              <span className="text-xs">{new Date(project.uploadDate).toLocaleDateString()}</span>
                            </div>
                            
                            <div className="flex gap-3">
                              <Link
                                to={`/project/${project.id}`}
                                className="flex-1 text-center px-4 py-2 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200"
                              >
                                View Details
                              </Link>
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                <BarChart3 className="w-4 h-4" />
                              </motion.button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'purchased' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Purchased Projects</h2>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      {purchasedProjects.map((project, index) => (
                        <motion.div
                          key={project.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -5 }}
                          className="bg-gradient-to-br from-white to-gray-50 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                          <div className="relative">
                            <img 
                              src={project.thumbnail} 
                              alt={project.title}
                              className="w-full h-48 object-cover"
                            />
                            <div className="absolute top-4 left-4">
                              <span className="px-3 py-1 bg-green-500 text-white rounded-full text-xs font-bold">
                                Owned
                              </span>
                            </div>
                          </div>
                          
                          <div className="p-6">
                            <div className="flex items-center justify-between mb-3">
                              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                                {project.category}
                              </span>
                              <div className="text-right">
                                <div className="text-lg font-bold text-gray-900">${project.price}</div>
                                <div className="text-xs text-gray-500">paid</div>
                              </div>
                            </div>
                            
                            <h3 className="text-lg font-bold text-gray-900 mb-2">{project.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">by {project.seller}</p>
                            <p className="text-xs text-gray-500 mb-4">Purchased on {new Date(project.purchaseDate).toLocaleDateString()}</p>
                            
                            <div className="flex gap-3">
                              <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 transition-all duration-200"
                              >
                                <Download className="w-4 h-4" />
                                Download
                              </motion.button>
                              <Link
                                to={`/project/${project.id}`}
                                className="px-4 py-2 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors flex items-center justify-center"
                              >
                                <Eye className="w-4 h-4" />
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'activity' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Recent Activity</h2>
                    
                    <div className="space-y-4">
                      {recentActivity.map((activity, index) => (
                        <motion.div
                          key={activity.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center gap-4 p-6 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                        >
                          <div className={`w-4 h-4 rounded-full ${
                            activity.type === 'view' ? 'bg-blue-500' :
                            activity.type === 'star' ? 'bg-yellow-500' :
                            activity.type === 'purchase' ? 'bg-green-500' :
                            'bg-purple-500'
                          }`} />
                          <div className="flex-1">
                            <p className="text-gray-900 font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-600">{activity.project}</p>
                          </div>
                          <span className="text-sm text-gray-500">{activity.time}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {activeTab === 'settings' && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h2 className="text-2xl font-bold text-gray-900 mb-8">Account Settings</h2>
                    
                    <div className="space-y-8">
                      <div className="flex items-center gap-8">
                        <div className="relative">
                          <img 
                            src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150'} 
                            alt={user?.name}
                            className="w-24 h-24 rounded-full object-cover ring-4 ring-blue-100"
                          />
                        </div>
                        <div>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg"
                          >
                            Change Avatar
                          </motion.button>
                          <p className="text-sm text-gray-600 mt-2">JPG, PNG or GIF. Max size 2MB.</p>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Full Name</label>
                          <input
                            type="text"
                            defaultValue={user?.name || 'Student User'}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-3">Email</label>
                          <input
                            type="email"
                            defaultValue={user?.email || 'student@example.com'}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-3">Bio</label>
                        <textarea
                          rows={4}
                          placeholder="Tell us about yourself and your interests..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
                        />
                      </div>

                      <div className="flex gap-4 pt-6">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg"
                        >
                          Save Changes
                        </motion.button>
                        <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
                          Cancel
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default StudentDashboard;