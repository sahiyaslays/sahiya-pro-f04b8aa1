import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { checkIsAdmin } from '@/lib/adminUtils';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  signUp: (email: string, password: string, firstName: string, lastName: string, phone: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  loading: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  // Check admin role when user changes
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (user) {
        const adminStatus = await checkIsAdmin(user.id);
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
    };

    checkAdminStatus();
  }, [user]);

  useEffect(() => {
    // SSR-safe: skip auth setup on server
    if (typeof window === 'undefined') {
      setLoading(false);
      return;
    }

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signUp = async (email: string, password: string, firstName: string, lastName: string, phone: string) => {
    try {
      const redirectUrl = typeof window !== 'undefined' ? `${window.location.origin}/user-dashboard` : '/user-dashboard';
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
            phone: phone,
          },
        },
      });

      if (error) throw error;

      toast.success('Account created successfully!');
      
      // Check if user is admin after signup
      if (data.user) {
        const adminStatus = await checkIsAdmin(data.user.id);
        if (adminStatus) {
          navigate('/admin');
        } else {
          navigate('/user-dashboard');
        }
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'Failed to create account');
      return { error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast.success('Signed in successfully!');
      
      // Check if user is admin from database
      if (data.user) {
        const adminStatus = await checkIsAdmin(data.user.id);
        setIsAdmin(adminStatus);
        if (adminStatus) {
          navigate('/admin');
        } else {
          navigate('/user-dashboard');
        }
      }
      
      return { error: null };
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast.error(error.message || 'Failed to sign in');
      return { error };
    }
  };

  const signOut = async () => {
    try {
      // Clear local state first
      setUser(null);
      setSession(null);
      setIsAdmin(false);
      
      // Attempt to sign out from Supabase
      await supabase.auth.signOut();
      
      toast.success('Signed out successfully');
      navigate('/');
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast.success('Signed out successfully');
      navigate('/');
    }
  };

  const value = {
    user,
    session,
    signUp,
    signIn,
    signOut,
    loading,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};