import { supabase } from '@/integrations/supabase/client';

/**
 * Check if a user has the admin role in the database
 * Uses the has_role security definer function to avoid RLS recursion
 */
export const checkIsAdmin = async (userId: string): Promise<boolean> => {
  try {
    const { data, error } = await supabase.rpc('has_role', {
      _user_id: userId,
      _role: 'admin'
    });

    if (error) {
      console.error('Error checking admin role:', error);
      return false;
    }

    return data === true;
  } catch (error) {
    console.error('Error checking admin role:', error);
    return false;
  }
};

/**
 * Check if the current authenticated user is an admin
 */
export const isCurrentUserAdmin = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user) {
    return false;
  }

  return checkIsAdmin(user.id);
};
