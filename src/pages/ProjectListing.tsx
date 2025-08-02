import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, ChevronDown, Grid, List, TrendingUp, Award, Clock, Heart, Eye, Code, Users, Zap, Siren as Fire, Sparkles } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectCardGrid from '../components/ProjectCardGrid';

const ProjectListing = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [viewMode, setViewMode] = useState('grid');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const projects = [
    {
      id: 1,
      title: 'E-commerce Web Application',
      category: 'React',
      price: 29,
      originalPrice: 49,
      rating: 4.9,
      reviews: 45,
      likes: 234,
      views: 1250,
      thumbnail: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: {
        name: 'John Doe',
        avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=100',
        level: 'Top Rated',
        rating: 4.9
      },
      description: 'Complete e-commerce solution with cart, payment integration, and admin panel. Perfect for learning modern web development.',
      techStack: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      featured: true,
      trending: true,
      dateAdded: '2024-01-15',
      deliveryTime: '2 days',
      sales: 89,
      difficulty: 'Intermediate',
      githubStars: 156
    },
    {
      id: 2,
      title: 'Hospital Management System',
      category: 'Java',
      price: 45,
      originalPrice: 65,
      rating: 4.8,
      reviews: 32,
      likes: 189,
      views: 890,
      thumbnail: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: {
        name: 'Sarah Wilson',
        avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
        level: 'Level 2',
        rating: 4.8
      },
      description: 'Complete hospital management with patient records, appointments, and billing system.',
      techStack: ['Java', 'Spring Boot', 'MySQL', 'JSP'],
      featured: false,
      trending: false,
      dateAdded: '2024-01-10',
      deliveryTime: '3 days',
      sales: 67,
      difficulty: 'Advanced',
      githubStars: 89
    },
    {
      id: 3,
      title: 'Social Media Dashboard',
      category: 'Python',
      price: 35,
      originalPrice: 55,
      rating: 4.7,
      reviews: 28,
      likes: 167,
      views: 1100,
      thumbnail: 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: {
        name: 'Mike Johnson',
        avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
        level: 'Top Rated',
        rating: 4.9
      },
      description: 'Analytics dashboard for social media management with real-time data visualization.',
      techStack: ['Python', 'Django', 'PostgreSQL', 'Chart.js'],
      featured: true,
      trending: true,
      dateAdded: '2024-01-08',
      deliveryTime: '1 day',
      sales: 134,
      difficulty: 'Intermediate',
      githubStars: 203
    },
    {
      id: 4,
      title: 'Task Management App',
      category: 'React',
      price: 22,
      originalPrice: 35,
      rating: 4.6,
      reviews: 19,
      likes: 98,
      views: 650,
      thumbnail: 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: {
        name: 'Emma Davis',
        avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
        level: 'Level 1',
        rating: 4.6
      },
      description: 'Collaborative task management with team features and real-time notifications.',
      techStack: ['React', 'Firebase', 'Material-UI'],
      featured: false,
      trending: false,
      dateAdded: '2024-01-05',
      deliveryTime: '2 days',
      sales: 45,
      difficulty: 'Beginner',
      githubStars: 67
    },
    {
      id: 5,
      title: 'Online Learning Platform',
      category: 'PHP',
      price: 55,
      originalPrice: 80,
      rating: 4.9,
      reviews: 67,
      likes: 312,
      views: 1800,
      thumbnail: 'https://images.pexels.com/photos/4491461/pexels-photo-4491461.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: {
        name: 'David Brown',
        avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100',
        level: 'Top Rated',
        rating: 4.9
      },
      description: 'Complete LMS with video streaming, quizzes, and progress tracking features.',
      techStack: ['PHP', 'Laravel', 'MySQL', 'Bootstrap'],
      featured: true,
      trending: true,
      dateAdded: '2024-01-12',
      deliveryTime: '4 days',
      sales: 156,
      difficulty: 'Advanced',
      githubStars: 278
    },
    {
      id: 6,
      title: 'Mobile Banking App',
      category: 'Mobile',
      price: 40,
      originalPrice: 60,
      rating: 4.5,
      reviews: 23,
      likes: 145,
      views: 720,
      thumbnail: 'https://images.pexels.com/photos/4386371/pexels-photo-4386371.jpeg?auto=compress&cs=tinysrgb&w=400',
      seller: {
        name: 'Lisa Anderson',
        avatar: 'https://images.pexels.com/photos/1181424/pexels-photo-1181424.jpeg?auto=compress&cs=tinysrgb&w=100',
        level: 'Level 2',
        rating: 4.5
      },
      description: 'Secure mobile banking with biometric authentication and transaction history.',
      techStack: ['React Native', 'Node.js', 'MongoDB'],
      featured: false,
      trending: false,
      dateAdded: '2024-01-03',
      deliveryTime: '3 days',
      sales: 78,
      difficulty: 'Intermediate',
      githubStars: 134
    }
  ];

  const categories = ['all', 'React', 'Java', 'Python', 'PHP', 'Mobile', 'Node.js'];
  const allTags = ['React', 'Node.js', 'MongoDB', 'Stripe', 'Java', 'Spring Boot', 'MySQL', 'Python', 'Django', 'PostgreSQL', 'Chart.js', 'Firebase', 'Material-UI', 'PHP', 'Laravel', 'Bootstrap', 'React Native'];

  const filteredProjects = useMemo(() => {
    let filtered = projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           project.techStack.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase())) ||
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
      const matchesPrice = project.price >= priceRange[0] && project.price <= priceRange[1];
      const matchesTags = selectedTags.length === 0 || selectedTags.some(tag => project.techStack.includes(tag));
      
      return matchesSearch && matchesCategory && matchesPrice && matchesTags;
    });

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
        case 'oldest':
          return new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime();
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.likes - a.likes;
        case 'trending':
          return (b.trending ? 1 : 0) - (a.trending ? 1 : 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchTerm, selectedCategory, sortBy, priceRange, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slideInDown">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Discover Amazing
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Student Projects
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Explore cutting-edge projects, learn from the best, and accelerate your development journey
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex justify-center items-center gap-8 mt-12 animate-slideInUp">
            <div className="text-center">
              <div className="text-3xl font-bold">{projects.length}+</div>
              <div className="text-blue-200">Projects</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-blue-200">Students</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-blue-200">Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Bar */}
        <div className="mb-8 animate-slideInUp">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search projects, technologies, or keywords..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-16 pr-6 py-5 text-lg border-0 rounded-2xl bg-white shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:shadow-2xl transition-all duration-300 placeholder-gray-500"
            />
            <div className="absolute inset-y-0 right-0 pr-6 flex items-center">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-500 animate-pulse" />
                <span className="text-sm text-gray-500 font-medium">AI-Powered</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 shadow-xl mb-8 border border-white/20 animate-slideInUp" style={{ animationDelay: '200ms' }}>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Categories */}
            <div className="flex-1">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Categories</label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-gradient-to-r from-blue-600 to-teal-600 text-white shadow-lg scale-105'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {category === 'all' ? 'All Projects' : category}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort & View */}
            <div className="flex items-end gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Sort By</label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white border border-gray-200 rounded-xl px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <option value="newest">Newest First</option>
                    <option value="trending">Trending</option>
                    <option value="popular">Most Popular</option>
                    <option value="rating">Highest Rated</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>

              <div className="flex bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' ? 'bg-white shadow-lg scale-105' : 'hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' ? 'bg-white shadow-lg scale-105' : 'hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Tech Stack Tags */}
          <div className="mt-6 pt-6 border-t border-gray-200">
            <label className="block text-sm font-semibold text-gray-700 mb-3">Filter by Technology</label>
            <div className="flex flex-wrap gap-2">
              {allTags.slice(0, 12).map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedTags.includes(tag)
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {selectedTags.length > 0 && (
              <button
                onClick={() => setSelectedTags([])}
                className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-8 animate-slideInUp" style={{ animationDelay: '300ms' }}>
          <div>
            <p className="text-gray-600 text-lg">
              Showing <span className="font-bold text-gray-900">{filteredProjects.length}</span> of <span className="font-bold text-gray-900">{projects.length}</span> projects
            </p>
            {selectedTags.length > 0 && (
              <p className="text-sm text-blue-600 mt-1">
                Filtered by: {selectedTags.join(', ')}
              </p>
            )}
          </div>
          
          {/* Trending Projects Indicator */}
          {filteredProjects.some(p => p.trending) && (
            <div className="flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-semibold">Trending Now</span>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <ProjectCardGrid
            projects={filteredProjects.map(project => ({
              id: project.id,
              title: project.title,
              description: project.description,
              coverImage: project.thumbnail,
              techStack: project.techStack,
              author: {
                name: project.seller.name,
                avatar: project.seller.avatar,
                level: project.seller.level,
              },
              stats: {
                stars: project.githubStars,
                likes: project.likes,
                views: project.views,
                sales: project.sales,
              },
              price: project.price,
              originalPrice: project.originalPrice,
              rating: project.rating,
              reviews: project.reviews,
              githubUrl: project.githubUrl,
              liveDemo: project.liveDemo,
              featured: project.featured,
              trending: project.trending,
              difficulty: project.difficulty,
              deliveryTime: project.deliveryTime,
              dateAdded: project.dateAdded,
            }))}
            variant="default"
            showPrice={true}
            showStats={true}
            showActions={true}
            gridCols="auto"
          />
        ) : (
          <div className="text-center py-16 animate-slideInUp">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Filter className="w-12 h-12 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No projects found</h3>
            <p className="text-gray-600 text-lg mb-6">Try adjusting your search criteria or filters to discover more projects.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                  setSelectedTags([]);
                }}
                className="px-8 py-3 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Clear All Filters
              </button>
              <Link
                to="/upload"
                className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                🚀 Upload Your Project
              </Link>
            </div>
          </div>
        )}

        {/* Load More Button */}
        {filteredProjects.length > 0 && filteredProjects.length >= 6 && (
          <div className="text-center mt-12 animate-slideInUp">
            <button className="px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 text-gray-800 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center gap-3 mx-auto">
              <Zap className="w-5 h-5" />
              Load More Projects
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectListing;