import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'admin' | 'intern';

export interface User {
  id: string;
  username: string;
  role: UserRole;
  name: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  selectedRole: UserRole | null;
  login: (username: string, password: string, role: UserRole) => Promise<boolean>;
  logout: () => void;
  selectRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers = {
  admin: { id: '1', username: 'admin', name: 'John Smith', role: 'admin' as UserRole },
  intern: { id: '2', username: 'intern', name: 'Sarah Johnson', role: 'intern' as UserRole }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    // Mock authentication - in production, this would call Firebase Auth
    if (username === role && password === 'password') {
      setUser(mockUsers[role]);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setSelectedRole(null);
  };

  const selectRole = (role: UserRole) => {
    setSelectedRole(role);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    selectedRole,
    login,
    logout,
    selectRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};