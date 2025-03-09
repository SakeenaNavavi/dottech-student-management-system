import React, { useState, useEffect } from 'react';
import { User, Upload, Save, Edit, LogOut } from 'lucide-react';

// Main Dashboard Component
const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [student, setStudent] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    age: 20,
    profilePicture: null
  });

  // Sample marks data
  const [marks, setMarks] = useState({
    mathematics: '',
    science: '',
    english: '',
    history: '',
    geography: '',
    computerScience: '',
    physics: '',
    chemistry: '',
    biology: ''
  });

  const [isEditing, setIsEditing] = useState(false);
  
  // Handle profile update
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // Here you would send the updated profile to the backend
    alert('Profile updated successfully!');
  };

  // Handle marks update
  const handleMarksUpdate = (e) => {
    e.preventDefault();
    // Here you would send the updated marks to the backend
    alert('Marks updated successfully!');
  };

  // Handle profile picture upload
  const handleProfilePictureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setStudent({...student, profilePicture: reader.result});
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle input change for profile
  const handleProfileChange = (e) => {
    setStudent({
      ...student,
      [e.target.name]: e.target.value
    });
  };

  // Handle input change for marks
  const handleMarksChange = (e) => {
    setMarks({
      ...marks,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-red-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Student Dashboard</h1>
          <button className="flex items-center gap-2 bg-black px-4 py-2 rounded hover:bg-gray-800">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex flex-1 container mx-auto mt-6">
        {/* Sidebar */}
        <div className="w-64 bg-gray-900 p-4 rounded-l">
          <div className="flex flex-col gap-4">
            <button 
              className={`flex items-center gap-2 p-3 rounded text-left ${activeTab === 'profile' ? 'bg-red-900' : 'hover:bg-gray-800'}`}
              onClick={() => setActiveTab('profile')}
            >
              <User size={18} /> Profile
            </button>
            <button 
              className={`flex items-center gap-2 p-3 rounded text-left ${activeTab === 'marks' ? 'bg-red-900' : 'hover:bg-gray-800'}`}
              onClick={() => setActiveTab('marks')}
            >
              <Edit size={18} /> Update Marks
            </button>
          </div>
        </div>
        
        {/* Content Area */}
        <div className="flex-1 bg-gray-900 p-6 rounded-r">
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-40 h-40 relative rounded-full bg-gray-800 overflow-hidden flex items-center justify-center">
                  {student.profilePicture ? (
                    <img src={student.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                  ) : (
                    <User size={80} className="text-gray-500" />
                  )}
                  <input 
                    type="file" 
                    id="profilePicture" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleProfilePictureUpload} 
                  />
                  <label 
                    htmlFor="profilePicture" 
                    className="absolute bottom-0 w-full bg-red-900 text-white text-center py-1 cursor-pointer hover:bg-red-800"
                  >
                    <Upload size={16} className="inline mr-1" /> Upload
                  </label>
                </div>
                
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold">Student Profile</h2>
                    <button 
                      className="bg-red-900 px-4 py-2 rounded hover:bg-red-800 flex items-center gap-2"
                      onClick={() => setIsEditing(!isEditing)}
                    >
                      <Edit size={16} /> {isEditing ? 'Cancel' : 'Edit Profile'}
                    </button>
                  </div>
                  
                  {isEditing ? (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm mb-1">First Name</label>
                          <input 
                            type="text" 
                            name="firstName" 
                            value={student.firstName} 
                            onChange={handleProfileChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Last Name</label>
                          <input 
                            type="text" 
                            name="lastName" 
                            value={student.lastName} 
                            onChange={handleProfileChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Email</label>
                          <input 
                            type="email" 
                            name="email" 
                            value={student.email} 
                            onChange={handleProfileChange}
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm mb-1">Age</label>
                          <input 
                            type="number" 
                            name="age" 
                            value={student.age} 
                            onChange={handleProfileChange}
                            min="18"
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
                            required
                          />
                        </div>
                      </div>
                      <button 
                        type="submit" 
                        className="bg-red-900 px-4 py-2 rounded hover:bg-red-800 flex items-center gap-2"
                      >
                        <Save size={16} /> Save Changes
                      </button>
                    </form>
                  ) : (
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-400">First Name</p>
                          <p className="font-medium">{student.firstName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Last Name</p>
                          <p className="font-medium">{student.lastName}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Email</p>
                          <p className="font-medium">{student.email}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-400">Age</p>
                          <p className="font-medium">{student.age}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'marks' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Update Last Term Marks</h2>
              </div>
              
              <form onSubmit={handleMarksUpdate} className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {Object.keys(marks).map((subject) => (
                    <div key={subject}>
                      <label className="block text-sm mb-1 capitalize">
                        {subject.replace(/([A-Z])/g, ' $1').trim()}
                      </label>
                      <input 
                        type="number" 
                        name={subject} 
                        value={marks[subject]} 
                        onChange={handleMarksChange}
                        min="0"
                        max="100"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
                        required
                      />
                    </div>
                  ))}
                </div>
                <button 
                  type="submit" 
                  className="bg-red-900 px-4 py-2 rounded hover:bg-red-800 flex items-center gap-2"
                >
                  <Save size={16} /> Save Marks
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 p-4 mt-6">
        <div className="container mx-auto text-center text-sm text-gray-400">
          &copy; 2025 Dottech Software (Pvt) LTD. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default StudentDashboard;