import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { LogIn } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      const success = await login(email, password);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setError('Invalid email or password');
      }
    } catch (err) {
      setError('An error occurred during login');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="card">
      <div className="flex justify-center mb-6">
        <div className="h-14 w-14 rounded-full bg-primary-100 flex items-center justify-center">
          <LogIn className="h-7 w-7 text-primary-600" />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-center mb-6">Welcome Back</h2>
      
      {error && (
        <div className="mb-6 p-3 bg-error-50 text-error-700 rounded-md text-sm">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-1">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input"
            placeholder="Enter your email"
            required
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700">
              Password
            </label>
            <Link to="#" className="text-xs text-primary-600 hover:text-primary-500">
              Forgot password?
            </Link>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input"
            placeholder="Enter your password"
            required
          />
        </div>
        
        <div>
          <button
            type="submit"
            className="btn-primary w-full"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>
        </div>
      </form>
      
      <div className="mt-6 text-center text-sm">
        <p className="text-neutral-600">
          Don't have an account?{' '}
          <Link to="/register" className="text-primary-600 hover:text-primary-500 font-medium">
            Sign up
          </Link>
        </p>
      </div>
      
      <div className="mt-8 pt-6 border-t border-neutral-200 text-center text-xs text-neutral-500">
        <p>For demo, use: user@example.com / password123</p>
      </div>
    </div>
  );
};

export default Login;