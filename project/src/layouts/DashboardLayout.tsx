import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Home, 
  Activity, 
  User, 
  Calendar, 
  Pill, 
  MessageSquare, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useAuthStore } from '../stores/authStore';

const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { to: '/dashboard', icon: <Home size={20} />, label: 'Dashboard' },
    { to: '/dashboard/symptom-checker', icon: <Activity size={20} />, label: 'Symptom Checker' },
    { to: '/dashboard/medical-profile', icon: <User size={20} />, label: 'Medical Profile' },
    { to: '/dashboard/appointments', icon: <Calendar size={20} />, label: 'Appointments' },
    { to: '/dashboard/medications', icon: <Pill size={20} />, label: 'Medications' },
    { to: '/dashboard/health-chat', icon: <MessageSquare size={20} />, label: 'Health Chat' },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-neutral-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white border-b border-neutral-200 py-4 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-7 w-7 text-primary-600" />
            <span className="text-lg font-bold text-neutral-900">HealthAssist<span className="text-primary-600">AI</span></span>
          </div>
          <button onClick={toggleMobileMenu} className="p-2 rounded-md text-neutral-500 hover:bg-neutral-100">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-neutral-900 bg-opacity-50">
          <div className="bg-white h-full w-64 shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-neutral-200">
              <div className="flex items-center space-x-2">
                <Heart className="h-6 w-6 text-primary-600" />
                <span className="font-bold text-neutral-900">HealthAssistAI</span>
              </div>
              <button onClick={toggleMobileMenu} className="p-1 rounded-md text-neutral-500 hover:bg-neutral-100">
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              <nav className="px-2 pt-4 space-y-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    onClick={toggleMobileMenu}
                    className={({ isActive }) =>
                      `flex items-center px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary-50 text-primary-700'
                          : 'text-neutral-700 hover:bg-neutral-100'
                      }`
                    }
                    end={item.to === '/dashboard'}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </NavLink>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t border-neutral-200">
              <div className="flex items-center space-x-3 mb-4">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
                  {user?.firstName[0]}{user?.lastName[0]}
                </div>
                <div>
                  <p className="font-medium">{user?.firstName} {user?.lastName}</p>
                  <p className="text-sm text-neutral-500">{user?.email}</p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 w-full px-3 py-2 text-left rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
              >
                <LogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col lg:w-64 border-r border-neutral-200 bg-white">
        <div className="p-6 border-b border-neutral-200">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-neutral-900">HealthAssist<span className="text-primary-600">AI</span></span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto py-4 px-3">
          <nav className="space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 rounded-md transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-neutral-700 hover:bg-neutral-100'
                  }`
                }
                end={item.to === '/dashboard'}
              >
                <span className="mr-3">{item.icon}</span>
                <span>{item.label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
        <div className="p-4 border-t border-neutral-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold">
              {user?.firstName[0]}{user?.lastName[0]}
            </div>
            <div>
              <p className="font-medium">{user?.firstName} {user?.lastName}</p>
              <p className="text-sm text-neutral-500">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 w-full px-3 py-2 text-left rounded-md text-neutral-700 hover:bg-neutral-100 transition-colors"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;