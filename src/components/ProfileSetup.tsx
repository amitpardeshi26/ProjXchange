import React, { useState } from 'react';
import { User, Upload, MapPin, Globe, Github, Linkedin, Twitter, Plus, X, Save, Loader } from 'lucide-react';
import { useUserProfile } from '../hooks/useUserProfile';
import { CreateUserProfileRequest } from '../types/user';
import { userProfileService } from '../services/userProfile.service';

interface ProfileSetupProps {
  userId: string;
  onComplete?: () => void;
  existingProfile?: any;
  isEditing?: boolean;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ 
  userId, 
  onComplete, 
  existingProfile, 
  isEditing = false 
}) => {
  const { createProfile, updateProfile, loading } = useUserProfile();
  const [formData, setFormData] = useState<CreateUserProfileRequest>({
    bio: existingProfile?.bio || '',
    location: existingProfile?.location || '',
    website: existingProfile?.website || '',
    experience_level: existingProfile?.experience_level || 'beginner',
    social_links: {
      github: existingProfile?.social_links?.github || '',
      linkedin: existingProfile?.social_links?.linkedin || '',
      twitter: existingProfile?.social_links?.twitter || '',
      portfolio: existingProfile?.social_links?.portfolio || '',
    },
    skills: existingProfile?.skills || [],
  });
  
  const [newSkill, setNewSkill] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string>(existingProfile?.avatar || '');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSocialLinkChange = (platform: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      social_links: {
        ...prev.social_links,
        [platform]: value
      }
    }));
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({ ...prev, avatar: 'File size must be less than 5MB' }));
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({ ...prev, avatar: 'Please select a valid image file' }));
        return;
      }

      setAvatarFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Clear avatar error
      setErrors(prev => ({ ...prev, avatar: '' }));
    }
  };

  const addSkill = () => {
    if (newSkill.trim() && !formData.skills?.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...(prev.skills || []), newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills?.filter(skill => skill !== skillToRemove) || []
    }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.bio?.trim()) {
      newErrors.bio = 'Bio is required';
    } else if (formData.bio.length < 10) {
      newErrors.bio = 'Bio must be at least 10 characters';
    }

    if (formData.website && !formData.website.match(/^https?:\/\/.+/)) {
      newErrors.website = 'Please enter a valid URL (starting with http:// or https://)';
    }

    if (!formData.skills?.length) {
      newErrors.skills = 'Please add at least one skill';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      let avatarBase64 = '';
      if (avatarFile) {
        avatarBase64 = await userProfileService.fileToBase64(avatarFile);
      }

      const profileData = {
        ...formData,
        ...(avatarBase64 && { avatar: avatarBase64 })
      };

      if (isEditing && existingProfile) {
        await updateProfile(userId, profileData);
      } else {
        await createProfile(profileData);
      }

      onComplete?.();
    } catch (error) {
      console.error('Profile setup error:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-teal-600 text-white p-8">
          <h2 className="text-3xl font-bold mb-2">
            {isEditing ? 'Edit Profile' : 'Complete Your Profile'}
          </h2>
          <p className="text-blue-100">
            {isEditing 
              ? 'Update your information to keep your profile current'
              : 'Help others get to know you better by completing your profile'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {/* Avatar Upload */}
          <div className="flex items-center gap-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-100 border-4 border-white shadow-lg">
                {avatarPreview ? (
                  <img 
                    src={avatarPreview} 
                    alt="Avatar preview" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-teal-100">
                    <User className="w-8 h-8 text-blue-600" />
                  </div>
                )}
              </div>
              <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors shadow-lg">
                <Upload className="w-4 h-4 text-white" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
              </label>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Profile Picture</h3>
              <p className="text-sm text-gray-600 mb-2">Upload a professional photo</p>
              <p className="text-xs text-gray-500">JPG, PNG or GIF. Max size 5MB.</p>
              {errors.avatar && (
                <p className="text-red-600 text-sm mt-1">{errors.avatar}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Bio *
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              placeholder="Tell us about yourself, your experience, and what you're passionate about..."
              rows={4}
              className={`w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none ${
                errors.bio ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
            />
            <div className="flex justify-between items-center mt-2">
              {errors.bio && (
                <p className="text-red-600 text-sm">{errors.bio}</p>
              )}
              <p className="text-sm text-gray-500 ml-auto">
                {formData.bio?.length || 0}/500 characters
              </p>
            </div>
          </div>

          {/* Experience Level & Location */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Experience Level
              </label>
              <select
                value={formData.experience_level}
                onChange={(e) => handleInputChange('experience_level', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="expert">Expert</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  placeholder="City, Country"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Website */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Website
            </label>
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="url"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                placeholder="https://yourwebsite.com"
                className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.website ? 'border-red-300 bg-red-50' : 'border-gray-300'
                }`}
              />
            </div>
            {errors.website && (
              <p className="text-red-600 text-sm mt-1">{errors.website}</p>
            )}
          </div>

          {/* Social Links */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Social Links
            </label>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="relative">
                <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  value={formData.social_links?.github || ''}
                  onChange={(e) => handleSocialLinkChange('github', e.target.value)}
                  placeholder="GitHub profile URL"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  value={formData.social_links?.linkedin || ''}
                  onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                  placeholder="LinkedIn profile URL"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  value={formData.social_links?.twitter || ''}
                  onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                  placeholder="Twitter profile URL"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="relative">
                <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="url"
                  value={formData.social_links?.portfolio || ''}
                  onChange={(e) => handleSocialLinkChange('portfolio', e.target.value)}
                  placeholder="Portfolio URL"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Skills */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Skills *
            </label>
            <div className="flex gap-3 mb-4">
              <input
                type="text"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Add a skill (e.g., React, Python, UI/UX)"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
              />
              <button
                type="button"
                onClick={addSkill}
                className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add
              </button>
            </div>
            
            {formData.skills && formData.skills.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-blue-100 text-blue-800 rounded-lg text-sm font-medium"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-blue-600 hover:text-blue-800 transition-colors"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            {errors.skills && (
              <p className="text-red-600 text-sm">{errors.skills}</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-blue-600 to-teal-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-teal-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  {isEditing ? 'Updating...' : 'Creating...'}
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  {isEditing ? 'Update Profile' : 'Complete Profile'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;