import React from 'react';
import ProjectCard from './ProjectCard';

interface Project {
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
}

interface ProjectCardGridProps {
  projects: Project[];
  variant?: 'default' | 'compact' | 'featured' | 'minimal';
  showPrice?: boolean;
  showStats?: boolean;
  showActions?: boolean;
  className?: string;
  gridCols?: 'auto' | '1' | '2' | '3' | '4' | '5' | '6';
  onLike?: (id: number | string) => void;
  onStar?: (id: number | string) => void;
  likedProjects?: (number | string)[];
  starredProjects?: (number | string)[];
  loading?: boolean;
  emptyState?: React.ReactNode;
}

const ProjectCardGrid: React.FC<ProjectCardGridProps> = ({
  projects,
  variant = 'default',
  showPrice = true,
  showStats = true,
  showActions = true,
  className = '',
  gridCols = 'auto',
  onLike,
  onStar,
  likedProjects = [],
  starredProjects = [],
  loading = false,
  emptyState,
}) => {
  const getGridClasses = () => {
    if (gridCols === 'auto') {
      switch (variant) {
        case 'compact':
          return 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4';
        case 'featured':
          return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
        case 'minimal':
          return 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6';
        default:
          return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';
      }
    }
    return `grid-cols-${gridCols}`;
  };

  const LoadingSkeleton = () => (
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 animate-pulse">
      <div className="h-48 bg-gray-200" />
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-6 bg-gray-200 rounded-full w-20" />
          <div className="h-5 bg-gray-200 rounded-full w-16" />
        </div>
        <div className="h-6 bg-gray-200 rounded mb-2" />
        <div className="h-4 bg-gray-200 rounded mb-4 w-3/4" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded-lg w-16" />
          <div className="h-6 bg-gray-200 rounded-lg w-20" />
          <div className="h-6 bg-gray-200 rounded-lg w-14" />
        </div>
        <div className="flex items-center mb-4">
          <div className="w-8 h-8 bg-gray-200 rounded-full mr-3" />
          <div className="h-4 bg-gray-200 rounded w-24" />
        </div>
        <div className="h-12 bg-gray-200 rounded-xl" />
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`grid ${getGridClasses()} gap-6 ${className}`}>
        {Array.from({ length: 6 }).map((_, index) => (
          <LoadingSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (projects.length === 0 && emptyState) {
    return <div className={className}>{emptyState}</div>;
  }

  if (projects.length === 0) {
    return (
      <div className={`text-center py-16 ${className}`}>
        <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-xl">?</span>
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">No projects found</h3>
        <p className="text-gray-600 text-lg">Try adjusting your search criteria or explore different categories.</p>
      </div>
    );
  }

  return (
    <div className={`grid ${getGridClasses()} gap-6 ${className}`}>
      {projects.map((project, index) => (
        <div
          key={project.id}
          className="animate-slideInUp"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <ProjectCard
            project={project}
            variant={variant}
            showPrice={showPrice}
            showStats={showStats}
            showActions={showActions}
            onLike={onLike}
            onStar={onStar}
            isLiked={likedProjects.includes(project.id)}
            isStarred={starredProjects.includes(project.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default ProjectCardGrid;