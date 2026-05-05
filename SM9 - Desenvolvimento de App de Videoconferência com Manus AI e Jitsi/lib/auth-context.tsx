import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

interface AuthContextType {
  user: string | null;
  isLoading: boolean;
  login: (username: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do AsyncStorage ao iniciar
  useEffect(() => {
    bootstrapAsync();
  }, []);

  const bootstrapAsync = async () => {
    try {
      const savedUser = await AsyncStorage.getItem('streamBuyUser');
      if (savedUser) {
        setUser(savedUser);
      }
    } catch (e) {
      console.error('Failed to restore user session', e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string) => {
    try {
      if (!username.trim()) {
        throw new Error('Nome de usuário não pode estar vazio');
      }
      await AsyncStorage.setItem('streamBuyUser', username);
      setUser(username);
    } catch (e) {
      console.error('Login failed', e);
      throw e;
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('streamBuyUser');
      setUser(null);
    } catch (e) {
      console.error('Logout failed', e);
      throw e;
    }
  };

  const value = {
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
