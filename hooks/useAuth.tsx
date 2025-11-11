
import React, { createContext, useState, useEffect, useContext, ReactNode, useMemo, useCallback } from 'react';
import { AuthChangeEvent, Session, User } from '@supabase/supabase-js';
import { supabase } from '../services/supabase';
import { AuthContextType, UserProfile } from '../types';
import toast from 'react-hot-toast';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDev, setIsDev] = useState(false);
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [paymentRequired, setPaymentRequired] = useState(false);

  useEffect(() => {
    setLoading(true);

    const handleAsyncAuthTasks = async (event: AuthChangeEvent, session: Session | null) => {
      const currentUser = session?.user;
      if (event === 'INITIAL_SESSION' || event === 'SIGNED_IN') {
        if (currentUser) {
          try {
            const { data: profileData, error } = await supabase.from('users').select('*').eq('id', currentUser.id).single();
            if (error) throw error;
            
            if (profileData) {
              if (profileData.is_banned) {
                if (profileData.ban_reason === 'PAYMENT') {
                  setPaymentRequired(true);
                } else {
                  toast.error(`Your account has been banned. Reason: ${profileData.ban_reason || 'No reason provided.'}`, { duration: 8000 });
                  await supabase.auth.signOut();
                  return;
                }
              } else {
                setPaymentRequired(false);
              }
              setProfile(profileData);
              setIsDev(profileData.username === 'devadmin' || currentUser.email === 'ryansh818@gmail.com');
              setIsViewOnly(currentUser.email === 'everettsfacts@gmail.com');
            } else {
              setProfile(null);
              setIsDev(currentUser.email === 'ryansh818@gmail.com');
            }
          } catch (e: any) {
            toast.error(`Session error: ${e.message}. Please sign in again.`);
            console.error("Auth state change error:", e);
            await supabase.auth.signOut();
          } finally {
            setLoading(false);
          }
        } else {
          // No user, clear all state.
          setProfile(null);
          setIsDev(false);
          setIsViewOnly(false);
          setPaymentRequired(false);
          setLoading(false);
        }
      } else if (event === 'SIGNED_OUT') {
        setProfile(null);
        setIsDev(false);
        setIsViewOnly(false);
        setPaymentRequired(false);
        setLoading(false);
      } else if (event === 'TOKEN_REFRESHED') {
        // The important synchronous tasks are already done.
        // Just ensure the loading state is correct.
        setLoading(current => (current ? false : current));
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      // Perform critical, synchronous updates immediately. This prevents race conditions
      // where a component might attempt an action with a stale user object or auth token.
      if (session) {
        supabase.realtime.setAuth(session.access_token);
      }
      setUser(session?.user ?? null);
      
      // Handle slower, asynchronous tasks like fetching data from the database.
      handleAsyncAuthTasks(event, session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);
  
  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
  }, []);


  const value = useMemo(() => ({
    user,
    profile,
    loading,
    isDev,
    isViewOnly,
    paymentRequired,
    signOut
  }), [user, profile, loading, isDev, isViewOnly, paymentRequired, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
