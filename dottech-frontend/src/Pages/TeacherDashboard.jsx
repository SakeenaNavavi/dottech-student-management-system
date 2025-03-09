import React, { useState, useEffect } from 'react';
import { Search, Edit, Trash2, X, User } from 'lucide-react';

const TeacherDashboard = () => {
  // Sample student data
  const [students, setStudents] = useState([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      age: 20,
      profilePicture: null,
      marks: {
        mathematics: 85,
        science: 78,
        english: 92,
        history: 88,
        geography: 76,
        computerScience: 95,
        physics: 82,
        chemistry: 79,
        biology: 84
      }
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      age: 21,
      profilePicture: null,
      marks: {
        mathematics: 92,
        science: 85,
        english: 88,
        history: 79,
        geography: 83,
        computerScience: 90,
        physics: 86,
        chemistry: 88,
        biology: 81
      }
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.j@example.com',
      age: 19,
      profilePicture: null,
      marks: {
        mathematics: 75,
        science: 82,
        english: 88,
        history: 91,
        geography: 79,
        computerScience: 85,
        physics: 72,
        chemistry: 77,
        biology: 80
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('view'); // 'view', 'edit', 'delete'
  const [editingStudent, setEditingStudent] = useState(null);

  // Filter students based on search term
  const filteredStudents = students.filter(student => 
    student.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle view student
  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
    setModalMode('view');
  };

  // Handle edit student
  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setEditingStudent({...student});
    setShowModal(true);
    setModalMode('edit');
  };

  // Handle delete student
  const handleDeleteStudent = (student) => {
    setSelectedStudent(student);
    setShowModal(true);
    setModalMode('delete');
  };

  // Handle save changes
  const handleSaveChanges = () => {
    setStudents(students.map(student => 
      student.id === editingStudent.id ? editingStudent : student
    ));
    setShowModal(false);
  };

  // Handle confirm delete
  const handleConfirmDelete = () => {
    setStudents(students.filter(student => student.id !== selectedStudent.id));
    setShowModal(false);
  };

  // Handle input change for editing student
  const handleEditChange = (e) => {
    setEditingStudent({
      ...editingStudent,
      [e.target.name]: e.target.value
    });
  };

  // Handle marks edit change
  const handleMarksEditChange = (e, subject) => {
    setEditingStudent({
      ...editingStudent,
      marks: {
        ...editingStudent.marks,
        [subject]: parseInt(e.target.value, 10)
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-red-900 p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">Teacher Dashboard</h1>
          <button className="bg-black px-4 py-2 rounded hover:bg-gray-800">Logout</button>
        </div>
      </header>
      
      {/* Main Content */}
      <div className="flex-1 container mx-auto my-6 p-6 bg-gray-900 rounded">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4">Student Management</h2>
          
          {/* Search Bar */}
          <div className="relative w-full md:w-1/2 mb-6">
            <input
              type="text"
              placeholder="Search students by name or email..."
              className="w-full p-3 pl-10 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
          </div>
          
          {/* Student List */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-800">
                <tr>
                  <th className="p-3 text-left">Profile</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Age</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr 
                    key={student.id} 
                    className="border-t border-gray-800 hover:bg-gray-800 cursor-pointer"
                  >
                    <td className="p-3" onClick={() => handleViewStudent(student)}>
                      <div className="w-10 h-10 rounded-full bg-gray-700 overflow-hidden flex items-center justify-center">
                        {student.profilePicture ? (
                          <img src={student.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                          <User size={20} className="text-gray-500" />
                        )}
                      </div>
                    </td>
                    <td className="p-3" onClick={() => handleViewStudent(student)}>
                      {student.firstName} {student.lastName}
                    </td>
                    <td className="p-3" onClick={() => handleViewStudent(student)}>
                      {student.email}
                    </td>
                    <td className="p-3" onClick={() => handleViewStudent(student)}>
                      {student.age}
                    </td>
                    <td className="p-3 text-right">
                      <button 
                        className="bg-blue-900 p-2 rounded mr-2 hover:bg-blue-800"
                        onClick={() => handleEditStudent(student)}
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        className="bg-red-900 p-2 rounded hover:bg-red-800"
                        onClick={() => handleDeleteStudent(student)}
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-900 p-4">
        <div className="container mx-auto text-center text-sm text-gray-400">
          &copy; 2025 Dottech Software (Pvt) LTD. All rights reserved.
        </div>
      </footer>
      
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-900 rounded-lg shadow-lg w-full max-w-2xl">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-4 border-b border-gray-800">
              <h3 className="text-xl font-bold">
                {modalMode === 'view' && 'Student Details'}
                {modalMode === 'edit' && 'Edit Student'}
                {modalMode === 'delete' && 'Confirm Delete'}
              </h3>
              <button 
                className="text-gray-400 hover:text-white"
                onClick={() => setShowModal(false)}
              >
                <X size={20} />
              </button>
            </div>
            
            {/* Modal Content */}
            <div className="p-6">
              {modalMode === 'view' && selectedStudent && (
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-32 h-32 rounded-full bg-gray-800 overflow-hidden flex items-center justify-center mx-auto md:mx-0">
                    {selectedStudent.profilePicture ? (
                      <img src={selectedStudent.profilePicture} alt="Profile" className="w-full h-full object-cover" />
                    ) : (
                      <User size={64} className="text-gray-500" />
                    )}
                  </div>
                  
                  <div className="flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      <div>
                        <p className="text-sm text-gray-400">First Name</p>
                        <p className="font-medium">{selectedStudent.firstName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Last Name</p>
                        <p className="font-medium">{selectedStudent.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Email</p>
                        <p className="font-medium">{selectedStudent.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-400">Age</p>
                        <p className="font-medium">{selectedStudent.age}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-bold mb-3">Subject Marks</h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {Object.entries(selectedStudent.marks).map(([subject, mark]) => (
                          <div key={subject}>
                            <p className="text-sm text-gray-400 capitalize">
                              {subject.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <p className="font-medium">{mark}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {modalMode === 'edit' && editingStudent && (
                <div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-sm mb-1">First Name</label>
                      <input 
                        type="text" 
                        name="firstName" 
                        value={editingStudent.firstName} 
                        onChange={handleEditChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Last Name</label>
                      <input 
                        type="text" 
                        name="lastName" 
                        value={editingStudent.lastName} 
                        onChange={handleEditChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Email</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={editingStudent.email} 
                        onChange={handleEditChange}
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-1">Age</label>
                      <input 
                        type="number" 
                        name="age" 
                        value={editingStudent.age} 
                        onChange={handleEditChange}
                        min="18"
                        className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-bold mb-3">Subject Marks</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                      {Object.entries(editingStudent.marks).map(([subject, mark]) => (
                        <div key={subject}>
                          <label className="block text-sm mb-1 capitalize">
                            {subject.replace(/([A-Z])/g, ' $1').trim()}
                          </label>
                          <input 
                            type="number" 
                            value={mark} 
                            onChange={(e) => handleMarksEditChange(e, subject)}
                            min="0"
                            max="100"
                            className="w-full p-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-red-900"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {modalMode === 'delete' && selectedStudent && (
                <div className="text-center">
                  <p className="mb-6">Are you sure you want to delete {selectedStudent.firstName} {selectedStudent.lastName}'s record? This action cannot be undone.</p>
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-800 flex justify-end gap-2">
              <button 
                className="px-4 py-2 bg-gray-800 rounded hover:bg-gray-700"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              
              {modalMode === 'edit' && (
                <button 
                  className="px-4 py-2 bg-red-900 rounded hover:bg-red-800"
                  onClick={handleSaveChanges}
                >
                  Save Changes
                </button>
              )}
              
              {modalMode === 'delete' && (
                <button 
                  className="px-4 py-2 bg-red-900 rounded hover:bg-red-800"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherDashboard;