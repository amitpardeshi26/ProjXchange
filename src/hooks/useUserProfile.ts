import { useState, useEffect } from 'react';
import { UserProfile, CreateUserProfileRequest, UpdateUserProfileRequest } from '../types/user';
import { userProfileService } from '../services/userProfile.service';

export const useUserProfile = (userId?: string) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async (id?: string) => {
    if (!id && !userId) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = id 
        ? await userProfileService.getProfile(id)
        : await userProfileService.getMyProfile();
      setProfile(response.profile);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const createProfile = async (profileData: CreateUserProfileRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userProfileService.createProfile(profileData);
      setProfile(response.profile);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to create profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (id: string, profileData: UpdateUserProfileRequest) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userProfileService.updateProfile(id, profileData);
      setProfile(response.profile);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const deleteProfile = async (id: string) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userProfileService.deleteProfile(id);
      setProfile(null);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete profile';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userId) {
      fetchProfile();
    }
  }, [userId]);

  return {
    profile,
    loading,
    error,
    fetchProfile,
    createProfile,
    updateProfile,
    deleteProfile,
    refetch: () => fetchProfile(userId),
  };
};

export const useAllUserProfiles = () => {
  const [profiles, setProfiles] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

  const fetchAllProfiles = async (includeDeleted = false) => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await userProfileService.getAllProfiles(includeDeleted);
      setProfiles(response.profiles);
      setTotal(response.total);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch profiles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProfiles();
  }, []);

  return {
    profiles,
    loading,
    error,
    total,
    fetchAllProfiles,
    refetch: () => fetchAllProfiles(),
  };
};