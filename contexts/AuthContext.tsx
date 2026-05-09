import { clearTokens } from '@/lib/api';
import { AuthResponse } from '@/types/user';
import * as SecureStore from 'expo-secure-store';
import React, { createContext, useContext, useEffect, useState } from 'react';

type AuthContextData = {
  user: AuthResponse | null;
  signIn: (data: AuthResponse) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSession();
  }, []);

  async function loadSession() {
    try {
      const session = await SecureStore.getItemAsync('session');

      if (session) {
        setUser(JSON.parse(session));
      }
    } catch (error) {
      console.error('Erro ao carregar sessão:', error);
    } finally {
      setLoading(false);
    }
  }

  async function signIn(data: AuthResponse) {
    await SecureStore.setItemAsync(
      'session',
      JSON.stringify(data)
    );

    setUser(data);
  }

  async function signOut() {
    await SecureStore.deleteItemAsync('session');
    await clearTokens();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        signIn,
        signOut,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}