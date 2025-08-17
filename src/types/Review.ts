export interface Review {
  id: string;
  project_id: string;
  user_id: string;
  rating: number;
  review_text: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    full_name: string;
    email: string;
  };
  project?: {
    id: string;
    title: string;
  };
}

export interface ReviewsApiResponse {
  reviews: Review[];
  total: number;
}

export interface RatingStats {
  average_rating: number;
  total_ratings: number;
  rating_distribution: {
    [key: string]: number;
  };
}