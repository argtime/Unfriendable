import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../services/supabase';
import toast from 'react-hot-toast';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const UpdatePasswordPage: React.FC = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // This listener handles the PASSWORD_RECOVERY event which occurs when the user
    // clicks the link in the password reset email. Supabase automatically handles
    // the token and sets up a temporary session for the user to update their password.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === 'PASSWORD_RECOVERY') {
        // Now the user is in a temporary authenticated state to update their password.
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);


  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
        setError("Password must be at least 6 characters long.");
        return;
    }
    setError(null);
    setLoading(true);

    // `updateUser` can be called here because the user has a valid session
    // from the password recovery link.
    const { error } = await supabase.auth.updateUser({ password: password });
    
    setLoading(false);
    if (error) {
      toast.error(error.message);
    } else {
      toast.success('Password updated successfully! Please log in.');
      // After a successful password update, Supabase invalidates all sessions for security.
      // We manually sign out to clear any lingering state and redirect to login.
      await supabase.auth.signOut();
      navigate('/login');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-10rem)]">
      <Card className="w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-accent mb-6">Set New Password</h1>
        <form onSubmit={handleUpdatePassword} className="space-y-4">
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-medium mb-1">New Password</label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-medium mb-1">Confirm New Password</label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
          <Button type="submit" loading={loading} className="w-full !mt-6">
            Update Password
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default UpdatePasswordPage;
