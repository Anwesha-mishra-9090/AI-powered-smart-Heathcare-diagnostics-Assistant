import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Heart } from 'lucide-react';

const AuthLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50 flex flex-col">
      <header className="border-b border-neutral-200 bg-white shadow-sm py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-neutral-900">HealthAssist<span className="text-primary-600">AI</span></span>
          </Link>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-neutral-700 hover:text-primary-600">Login</Link>
            <Link to="/register" className="btn-primary">Sign Up</Link>
          </div>
        </div>
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full mx-auto">
          <Outlet />
        </div>
      </main>
      
      <footer className="border-t border-neutral-200 py-6 bg-white">
        <div className="container mx-auto px-4 text-center text-neutral-500 text-sm">
          <p>&copy; {new Date().getFullYear()} HealthAssistAI. All rights reserved.</p>
          <p className="mt-2">This is a demo application for illustrative purposes only.</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;