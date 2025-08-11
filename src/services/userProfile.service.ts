import { UserProfile, CreateUserProfileRequest, UpdateUserProfileRequest } from '../types/user';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

class UserProfileService {
  private getAuthHeaders(): HeadersInit {
    const token = localStorage.getItem('auth_token');
    return {
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : '',
    };
  }

  async createProfile(profileData: CreateUserProfileRequest): Promise<{ message: string; profile: UserProfile }> {
    const response = await fetch(`${API_BASE_URL}/users/profile`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to create profile');
    }

    return response.json();
  }

  async updateProfile(id: string, profileData: UpdateUserProfileRequest): Promise<{ message: string; profile: UserProfile }> {
    const response = await fetch(`${API_BASE_URL}/users/profile/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to update profile');
    }

    return response.json();
  }

  async getProfile(id: string): Promise<{ profile: UserProfile }> {
    const response = await fetch(`${API_BASE_URL}/users/profile/${id}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch profile');
    }

    return response.json();
  }

  async getMyProfile(): Promise<{ profile: UserProfile }> {
    const response = await fetch(`${API_BASE_URL}/users/profile/me`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch profile');
    }

    return response.json();
  }

  async getAllProfiles(includeDeleted = false): Promise<{ profiles: UserProfile[]; total: number }> {
    const response = await fetch(`${API_BASE_URL}/users/profiles?include_deleted=${includeDeleted}`, {
      method: 'GET',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch profiles');
    }

    return response.json();
  }

  async deleteProfile(id: string): Promise<{ message: string }> {
    const response = await fetch(`${API_BASE_URL}/users/profile/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders(),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to delete profile');
    }

    return response.json();
  }

  // Utility method to convert file to base64
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }
}

export const userProfileService = new UserProfileService();