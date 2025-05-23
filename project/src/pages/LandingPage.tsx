import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Activity, User, Calendar, Pill, MessageSquare, ArrowRight, Check } from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-neutral-200 py-4 bg-white sticky top-0 z-10">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-primary-600" />
            <span className="text-xl font-bold text-neutral-900">HealthAssist<span className="text-primary-600">AI</span></span>
          </div>
          <div className="flex items-center space-x-4">
            <Link to="/login" className="text-neutral-700 hover:text-primary-600">Login</Link>
            <Link to="/register" className="btn-primary">Sign Up Free</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-50 py-20">
        <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6 leading-tight">
              Your Personal <span className="text-primary-600">AI Health Assistant</span> for Smarter Healthcare
            </h1>
            <p className="text-lg text-neutral-700 mb-8 leading-relaxed">
              Get instant symptom assessment, personalized health insights, and medication reminders. Take control of your health journey with our AI-powered diagnostic assistant.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Link to="/register" className="btn-primary text-center py-3 px-6 text-base">
                Get Started Free
              </Link>
              <Link to="/login" className="btn-outline text-center py-3 px-6 text-base">
                Learn More
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 lg:pl-12">
            <div className="bg-white rounded-xl shadow-card overflow-hidden border border-neutral-200">
              <div className="bg-primary-600 p-4 text-white flex items-center">
                <MessageSquare className="h-6 w-6 mr-2" />
                <span className="font-medium">Health Assistant</span>
              </div>
              <div className="p-6">
                <div className="flex mb-4">
                  <div className="bg-neutral-100 rounded-lg p-3 max-w-[80%] text-neutral-800">
                    I've been experiencing headaches, fatigue, and a mild fever for the past two days.
                  </div>
                </div>
                <div className="flex justify-end mb-4">
                  <div className="bg-primary-100 rounded-lg p-3 max-w-[80%] text-primary-800">
                    Based on your symptoms, you may have a common viral infection. I recommend rest, hydration, and over-the-counter fever reducers. If symptoms persist for more than 3 days or worsen, please consult your doctor.
                  </div>
                </div>
                <div className="flex mb-4">
                  <div className="bg-neutral-100 rounded-lg p-3 max-w-[80%] text-neutral-800">
                    Should I be worried about COVID-19?
                  </div>
                </div>
                <div className="flex justify-end">
                  <div className="bg-primary-100 rounded-lg p-3 max-w-[80%] text-primary-800">
                    Your symptoms are consistent with several respiratory conditions, including COVID-19. I recommend taking a COVID test to rule it out. Continue monitoring your symptoms and maintain isolation until you know more.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Comprehensive Health Management</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Our AI-powered platform offers a complete suite of tools to help you monitor, manage, and improve your health.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="card transition-all hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                <Activity className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Smart Symptom Checker</h3>
              <p className="text-neutral-600 mb-4">
                Describe your symptoms in everyday language and get AI-powered health insights and recommendations.
              </p>
              <Link to="/register" className="text-primary-600 font-medium inline-flex items-center">
                Try it now <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Feature 2 */}
            <div className="card transition-all hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-lg bg-secondary-100 flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-secondary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Health Profile</h3>
              <p className="text-neutral-600 mb-4">
                Keep track of your medical history, allergies, conditions, and medications in one secure location.
              </p>
              <Link to="/register" className="text-primary-600 font-medium inline-flex items-center">
                Learn more <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Feature 3 */}
            <div className="card transition-all hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-lg bg-accent-100 flex items-center justify-center mb-4">
                <MessageSquare className="h-6 w-6 text-accent-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Chat Assistant</h3>
              <p className="text-neutral-600 mb-4">
                Have natural conversations about your health concerns with our AI health assistant anytime.
              </p>
              <Link to="/register" className="text-primary-600 font-medium inline-flex items-center">
                Start chatting <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Feature 4 */}
            <div className="card transition-all hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-lg bg-success-100 flex items-center justify-center mb-4">
                <Calendar className="h-6 w-6 text-success-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Appointment Management</h3>
              <p className="text-neutral-600 mb-4">
                Schedule and track your medical appointments, receive reminders, and never miss a check-up.
              </p>
              <Link to="/register" className="text-primary-600 font-medium inline-flex items-center">
                Get organized <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Feature 5 */}
            <div className="card transition-all hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-lg bg-warning-100 flex items-center justify-center mb-4">
                <Pill className="h-6 w-6 text-warning-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Medication Reminders</h3>
              <p className="text-neutral-600 mb-4">
                Set up reminders for your medications and supplements to ensure you never miss a dose.
              </p>
              <Link to="/register" className="text-primary-600 font-medium inline-flex items-center">
                Stay on track <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
            
            {/* Feature 6 */}
            <div className="card transition-all hover:translate-y-[-4px]">
              <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Health Analytics</h3>
              <p className="text-neutral-600 mb-4">
                Visualize your health data with intuitive charts and gain insights into your health trends over time.
              </p>
              <Link to="/register" className="text-primary-600 font-medium inline-flex items-center">
                See insights <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Take Control of Your Health Today</h2>
          <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
            Join thousands of users who are already managing their health more effectively with HealthAssistAI.
          </p>
          <Link to="/register" className="inline-block bg-white text-primary-700 font-medium px-8 py-3 rounded-md hover:bg-neutral-100 transition-colors shadow-lg">
            Get Started Free
          </Link>
          <p className="mt-4 text-sm opacity-80">No credit card required. Cancel anytime.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-neutral-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
              Don't just take our word for it. Here's what people are saying about HealthAssistAI.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-card">
              <div className="flex items-center text-warning-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-700 mb-4">
                "The symptom checker is impressively accurate. It helped me identify a condition that I later confirmed with my doctor. The medication reminders are a lifesaver too!"
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold mr-3">
                  MS
                </div>
                <div>
                  <p className="font-medium">Michael S.</p>
                  <p className="text-sm text-neutral-500">Healthcare Professional</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-card">
              <div className="flex items-center text-warning-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-700 mb-4">
                "As someone with multiple chronic conditions, having all my health information in one place has been invaluable. The AI chat function helps me understand my symptoms better."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold mr-3">
                  JD
                </div>
                <div>
                  <p className="font-medium">Jennifer D.</p>
                  <p className="text-sm text-neutral-500">Chronic Condition Patient</p>
                </div>
              </div>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-card">
              <div className="flex items-center text-warning-500 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                  </svg>
                ))}
              </div>
              <p className="text-neutral-700 mb-4">
                "The appointment scheduling feature has transformed how I manage healthcare for my family. The interface is intuitive and the health insights are genuinely helpful."
              </p>
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-semibold mr-3">
                  RL
                </div>
                <div>
                  <p className="font-medium">Robert L.</p>
                  <p className="text-sm text-neutral-500">Family Caregiver</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Heart className="h-8 w-8 text-primary-600" />
              <span className="text-xl font-bold text-neutral-900">HealthAssist<span className="text-primary-600">AI</span></span>
            </div>
            <div className="flex space-x-6">
              <Link to="#" className="text-neutral-600 hover:text-primary-600">
                About
              </Link>
              <Link to="#" className="text-neutral-600 hover:text-primary-600">
                Features
              </Link>
              <Link to="#" className="text-neutral-600 hover:text-primary-600">
                Privacy
              </Link>
              <Link to="#" className="text-neutral-600 hover:text-primary-600">
                Terms
              </Link>
              <Link to="#" className="text-neutral-600 hover:text-primary-600">
                Contact
              </Link>
            </div>
          </div>
          <div className="border-t border-neutral-200 pt-8 mt-4 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-500 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} HealthAssistAI. All rights reserved.
            </p>
            <p className="text-neutral-500 text-sm">
              This is a demo application for illustrative purposes only. Not intended for actual medical use.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;