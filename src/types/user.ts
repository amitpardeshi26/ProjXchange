export interface User {
  id: string;
  email: string;
  full_name: string;
  user_type: string;
  verification_status: string;
  created_at: string;
  updated_at: string;
  email_verified: boolean;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  user?: User;
}

export interface UserProfile {
  id: string;
  rating: number;
  total_sales: number;
  total_purchases: number;
  experience_level: "beginner" | "intermediate" | "expert";
  avatar: string;
  bio: string;
  location: string;
  website: string;
  social_links: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
    [key: string]: string | undefined;
  };
  skills: string[];
  created_at: string;
  updated_at: string;
  status: string;
}

export interface CreateUserProfileRequest {
  rating?: number;
  total_sales?: number;
  total_purchases?: number;
  experience_level?: "beginner" | "intermediate" | "expert";
  avatar?: string;
  bio?: string;
  location?: string;
  website?: string;
  social_links?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
    [key: string]: string | undefined;
  };
  skills?: string[];
}

export interface UpdateUserProfileRequest extends Partial<CreateUserProfileRequest> {}