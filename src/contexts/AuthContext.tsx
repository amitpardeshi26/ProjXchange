import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserProfile } from '../types/user';
import { useUserProfile } from '../hooks/useUserProfile';

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  signup: (name: string, email: string, password: string, userType: string) => Promise<boolean>;
  isAuthenticated: boolean;
  isAdmin: boolean;
  isStudent: boolean;
  refreshProfile: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);


// Mock users database
const mockUsers: User[] = [
  {
    id: '1',
    full_name: 'John Doe',
    email: 'john@studystack.com',
    user_type: 'student',
    verification_status: 'verified',
    created_at: '2023-09-15T00:00:00Z',
    updated_at: '2023-09-15T00:00:00Z',
    email_verified: true
  },
  {
    id: '2',
    full_name: 'Admin User',
    email: 'admin@studystack.com',
    user_type: 'admin',
    verification_status: 'verified',
    created_at: '2023-01-01T00:00:00Z',
    updated_at: '2023-01-01T00:00:00Z',
    email_verified: true
  },
  {
    id: '3',
    full_name: 'Sarah Wilson',
    email: 'sarah@studystack.com',
    user_type: 'student',
    verification_status: 'verified',
    created_at: '2023-10-20T00:00:00Z',
    updated_at: '2023-10-20T00:00:00Z',
    email_verified: true
  }
];

// Mock passwords (in real app, these would be hashed)
const mockPasswords: Record<string, string> = {
  'john@studystack.com': 'student123',
  'admin@studystack.com': 'admin123',
  'sarah@studystack.com': 'student123'
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const { profile: userProfile, fetchProfile } = useUserProfile(user?.id);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('studystack_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const foundUser = mockUsers.find(u => u.email === email);
    const correctPassword = mockPasswords[email];

    if (foundUser && correctPassword === password) {
      setUser(foundUser);
      localStorage.setItem('studystack_user', JSON.stringify(foundUser));
      return true;
    }
    return false;
  };

  const signup = async (name: string, email: string, password: string, userType: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check if user already exists
    if (mockUsers.find(u => u.email === email)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      full_name: name,
      email,
      user_type: userType,
      verification_status: 'pending',
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      email_verified: false
    };

    mockUsers.push(newUser);
    mockPasswords[email] = password;
    setUser(newUser);
    localStorage.setItem('studystack_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('studystack_user');
  };

  const refreshProfile = () => {
    if (user?.id) {
      fetchProfile(user.id);
    }
  };

  const value: AuthContextType = {
    user,
    userProfile,
    login,
    logout,
    signup,
    isAuthenticated: !!user,
    isAdmin: user?.user_type === 'admin',
    isStudent: user?.user_type === 'student',
    refreshProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};