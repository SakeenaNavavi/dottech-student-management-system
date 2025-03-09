import React, { useState } from 'react';
import { ChevronRight, BookOpen, Users, LogIn, UserPlus, School } from 'lucide-react';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  const [activeTab, setActiveTab] = useState('student');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Navbar */}
      <nav className="bg-black py-4 px-6 flex justify-between items-center">
        <div className="flex items-center">
          <School className="text-red-600 mr-2" size={28} />
          <span className="text-xl font-bold">DotTech Academy</span>
        </div>
        <div className="flex items-center space-x-6">
          <a href="#features" className="hover:text-red-500 transition-colors">Features</a>
          <a href="#about" className="hover:text-red-500 transition-colors">About</a>
          <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md font-medium transition-colors">
            Sign In
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-b from-black to-gray-900 py-16 px-6 md:py-24 md:px-12 lg:px-16">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Student Registration <span className="text-red-600">System</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl text-gray-300">
            A comprehensive platform for students and teachers to manage academic records, profiles, and course information in one place.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              className={`px-6 py-3 rounded-md flex items-center justify-center font-medium transition-colors ${
                activeTab === 'student' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('student')}
            >
              <Users className="mr-2" size={20} />
              Student
            </button>
            <button 
              className={`px-6 py-3 rounded-md flex items-center justify-center font-medium transition-colors ${
                activeTab === 'teacher' 
                  ? 'bg-red-600 text-white' 
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
              onClick={() => setActiveTab('teacher')}
            >
              <BookOpen className="mr-2" size={20} />
              Teacher
            </button>
          </div>
          
          {/* Login/Register Forms Container */}
          <div className="mt-8 bg-gray-800 p-6 rounded-lg max-w-md">
            {activeTab === 'student' ? (
              <div>
                <h2 className="text-xl font-bold mb-4">Student Portal</h2>
                <div className="space-y-4">
                <Link to="/student/login">
                  <button className="w-full bg-white text-black hover:bg-gray-200 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors">
                    <LogIn className="mr-2" size={20} />
                    Login
                  </button>
                  </Link>
                  <br />
                  <Link to="/student/register">
                  <button className="w-full bg-red-600 hover:bg-red-700 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors">
                    <UserPlus className="mr-2" size={20} />
                    Register
                  </button>
                  </Link>

                </div>
                <p className="mt-4 text-sm text-gray-400">
                  Students can register, log in, update their profiles, and manage their academic records.
                </p>
              </div>
            ) : (
              <div>
                <h2 className="text-xl font-bold mb-4">Teacher Portal</h2>
                <div className="space-y-4">
                <Link to="/teacher/login">
                  <button className="w-full bg-white text-black hover:bg-gray-200 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors">
                    <LogIn className="mr-2" size={20} />
                    Login
                  </button>
                    </Link>
                    <br/>
                    <Link to="/teacher/register">
                  <button className="w-full bg-red-600 hover:bg-red-700 py-3 px-4 rounded-md flex items-center justify-center font-medium transition-colors">
                    <UserPlus className="mr-2" size={20} />
                    Register
                  </button>
                  </Link>
                </div>
                <p className="mt-4 text-sm text-gray-400">
                  Teachers can view student information, update details, and manage student records.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-16 px-6 md:px-12 lg:px-16 bg-gray-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-black p-6 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <UserPlus size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Easy Registration</h3>
              <p className="text-gray-400">Students can sign up with basic details and login credentials to access the system.</p>
            </div>
            <div className="bg-black p-6 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Profile Management</h3>
              <p className="text-gray-400">Update personal information, upload profile pictures, and manage academic details.</p>
            </div>
            <div className="bg-black p-6 rounded-lg">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center mb-4">
                <BookOpen size={24} />
              </div>
              <h3 className="text-xl font-bold mb-2">Academic Records</h3>
              <p className="text-gray-400">Students can update and view their term marks for all 9 subjects in one place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 px-6 md:px-12 lg:px-16 bg-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">About DotTech Academy</h2>
          <p className="text-gray-300 text-center max-w-3xl mx-auto mb-12">
            DotTech Academy's registration system provides a seamless experience for both students and teachers.
            Our platform ensures secure and efficient management of academic information.
          </p>
          <div className="bg-gray-900 p-6 rounded-lg">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-xl font-bold mb-2">Ready to get started?</h3>
                <p className="text-gray-400">Register now to access all features of the platform.</p>
              </div>
              <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-md font-medium transition-colors flex items-center">
                Sign Up Now
                <ChevronRight className="ml-2" size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-8 px-6 mt-auto">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <School className="text-red-600 mr-2" size={24} />
            <span className="text-lg font-bold">DotTech Academy</span>
          </div>
          <div className="text-gray-400 text-sm">
            &copy; 2025 Dottech Software (Pvt) LTD. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;