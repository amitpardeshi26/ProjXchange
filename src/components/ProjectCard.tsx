import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Star, 
  Heart, 
  Eye, 
  GitBranch, 
  ExternalLink, 
  Clock, 
  Award,
  TrendingUp,
  Users,
  Download
} from 'lucide-react';

interface ProjectCardProps {
  project: {
    id: number | string;
    title: string;
    description?: string;
    coverImage?: string;
    techStack: string[];
    author: {
      name: string;
      avatar: string;
      level?: string;
    };
    stats: {
      stars?: number;
      likes?: number;
      views?: number;
      downloads?: number;
      sales?: number;
    };
    price?: number;
    originalPrice?: number;
    rating?: number;
    reviews?: number;
    githubUrl?: string;
    liveDemo?: string;
    featured?: boolean;
    trending?: boolean;
    difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
    deliveryTime?: string;
    dateAdded?: string;
  };
  variant?: 'default' | 'compact' | 'featured' | 'minimal';
  showPrice?: boolean;
  showStats?: boolean;
  showActions?: boolean;
  className?: string;
  onLike?: (id: number | string) => void;
  onStar?: (id: number | string) => void;
  isLiked?: boolean;
  isStarred?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  variant = 'default',
  showPrice = true,
  showStats = true,
  showActions = true,
  className = '',
  onLike,
  onStar,
  isLiked = false,
  isStarred = false,
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleLike = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onLike?.(project.id);
  };

  const handleStar = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onStar?.(project.id);
  };

  const handleExternalLink = (e: React.MouseEvent, url: string) => {
    e.preventDefault();
    e.stopPropagation();
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'compact':
        return 'max-w-sm';
      case 'featured':
        return 'max-w-md ring-2 ring-blue-200 ring-opacity-50';
      case 'minimal':
        return 'max-w-xs shadow-sm';
      default:
        return 'max-w-sm';
    }
  };

  const getImageHeight = () => {
    switch (variant) {
      case 'compact':
        return 'h-40';
      case 'featured':
        return 'h-56';
      case 'minimal':
        return 'h-32';
      default:
        return 'h-48';
    }
  };

  const PlaceholderImage = () => (
    <div className={`w-full ${getImageHeight()} bg-gradient-to-br from-blue-100 via-purple-50 to-teal-100 flex items-center justify-center`}>
      <div className="text-center">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-3">
          <GitBranch className="w-8 h-8 text-white" />
        </div>
        <p className="text-sm font-medium text-gray-600">Project Preview</p>
      </div>
    </div>
  );

  return (
    <div className={`group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] hover:-translate-y-2 border border-gray-100 relative animate-slideInUp ${getVariantClasses()} ${className}`}>
      {/* Badges */}
      <div className="absolute top-4 left-4 z-20 flex flex-col gap-2">
        {project.featured && (
          <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-pulse">
            <Award className="w-3 h-3" />
            Featured
          </span>
        )}
        {project.trending && (
          <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg flex items-center gap-1 animate-bounce">
            <TrendingUp className="w-3 h-3" />
            Trending
          </span>
        )}
        {project.price && project.originalPrice && project.originalPrice > project.price && (
          <span className="bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg animate-pulse">
            {Math.round((1 - project.price / project.originalPrice) * 100)}% OFF
          </span>
        )}
      </div>

      {/* Action Buttons */}
      {showActions && (
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2">
          <button
            onClick={handleLike}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-600 hover:bg-red-50 hover:text-red-500'
            }`}
            title={isLiked ? 'Unlike' : 'Like'}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleStar}
            className={`w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 hover:scale-110 shadow-lg ${
              isStarred 
                ? 'bg-yellow-500 text-white' 
                : 'bg-white/90 text-gray-600 hover:bg-yellow-50 hover:text-yellow-500'
            }`}
            title={isStarred ? 'Unstar' : 'Star'}
          >
            <Star className={`w-4 h-4 ${isStarred ? 'fill-current' : ''}`} />
          </button>
        </div>
      )}

      {/* Cover Image */}
      <div className="relative overflow-hidden">
        {project.coverImage && !imageError ? (
          <img
            src={project.coverImage}
            alt={project.title}
            className={`w-full ${getImageHeight()} object-cover group-hover:scale-110 transition-transform duration-700 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageError(true)}
          />
        ) : (
          <PlaceholderImage />
        )}
        
        {/* Overlay with quick stats */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center text-white text-sm">
            <div className="flex items-center gap-3">
              {showStats && project.stats.views && (
                <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                  <Eye className="w-3 h-3" />
                  <span>{project.stats.views}</span>
                </div>
              )}
              {showStats && project.stats.downloads && (
                <div className="flex items-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1">
                  <Download className="w-3 h-3" />
                  <span>{project.stats.downloads}</span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2">
              {project.githubUrl && (
                <button
                  onClick={(e) => handleExternalLink(e, project.githubUrl!)}
                  className="w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
                  title="View on GitHub"
                >
                  <GitBranch className="w-4 h-4" />
                </button>
              )}
              {project.liveDemo && (
                <button
                  onClick={(e) => handleExternalLink(e, project.liveDemo!)}
                  className="w-8 h-8 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/50 transition-colors"
                  title="Live Demo"
                >
                  <ExternalLink className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 bg-gradient-to-b from-white to-gray-50/50">
        {/* Header with category and difficulty */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {project.techStack[0] && (
              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-full text-sm font-semibold shadow-sm">
                {project.techStack[0]}
              </span>
            )}
            {project.difficulty && (
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                project.difficulty === 'Beginner' ? 'bg-green-100 text-green-700' :
                project.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {project.difficulty}
              </span>
            )}
          </div>
          {project.rating && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
              <span className="text-sm font-semibold text-gray-700">{project.rating}</span>
              {project.reviews && (
                <span className="text-sm text-gray-500">({project.reviews})</span>
              )}
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 line-clamp-1">
          {project.title}
        </h3>

        {/* Description */}
        {project.description && variant !== 'minimal' && (
          <p className="text-gray-600 mb-4 font-medium line-clamp-2 leading-relaxed text-sm">
            {project.description}
          </p>
        )}

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.techStack.slice(variant === 'minimal' ? 0 : 1, variant === 'compact' ? 3 : 4).map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg text-xs font-medium shadow-sm hover:shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > (variant === 'compact' ? 3 : 4) && (
            <span className="px-2 py-1 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-700 rounded-lg text-xs font-medium shadow-sm">
              +{project.techStack.length - (variant === 'compact' ? 3 : 4)}
            </span>
          )}
        </div>

        {/* Author */}
        <div className="flex items-center mb-4">
          <img
            src={project.author.avatar}
            alt={project.author.name}
            className="w-8 h-8 rounded-full object-cover mr-3 ring-2 ring-blue-100 group-hover:ring-blue-200 transition-all duration-300"
          />
          <div className="flex-1">
            <div className="font-semibold text-gray-900 text-sm">{project.author.name}</div>
            {project.author.level && (
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                project.author.level === 'Top Rated'
                  ? 'bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700'
                  : 'bg-blue-100 text-blue-700'
              }`}>
                {project.author.level}
              </span>
            )}
          </div>
          {project.deliveryTime && (
            <div className="text-right text-xs text-gray-500">
              <Clock className="w-3 h-3 inline mr-1" />
              {project.deliveryTime}
            </div>
          )}
        </div>

        {/* Stats and Price */}
        <div className="flex items-center justify-between mb-4">
          {showStats && (
            <div className="flex items-center gap-4 text-sm text-gray-600">
              {project.stats.likes && (
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4 text-red-500" />
                  <span>{project.stats.likes}</span>
                </div>
              )}
              {project.stats.stars && (
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span>{project.stats.stars}</span>
                </div>
              )}
              {project.stats.sales && (
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4 text-green-500" />
                  <span>{project.stats.sales}</span>
                </div>
              )}
            </div>
          )}
          
          {showPrice && project.price && (
            <div className="text-right">
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-gray-900">${project.price}</span>
                {project.originalPrice && project.originalPrice > project.price && (
                  <span className="text-lg text-gray-500 line-through">${project.originalPrice}</span>
                )}
              </div>
              {project.originalPrice && project.originalPrice > project.price && (
                <div className="text-sm text-green-600 font-semibold">
                  Save ${project.originalPrice - project.price}
                </div>
              )}
            </div>
          )}
        </div>

        {/* CTA Button */}
        <Link
          to={`/project/${project.id}`}
          className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-teal-700 transition-all duration-300 hover:scale-105 transform"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;