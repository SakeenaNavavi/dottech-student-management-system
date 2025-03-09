// File: graphql/resolvers.js
const Student = require('../models/Student');
const Teacher = require('../models/Teacher');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AuthenticationError, UserInputError } = require('apollo-server-express');
const { GraphQLUpload } = require('graphql-upload');
const fs = require('fs');
const path = require('path');
const { finished } = require('stream/promises');
const nodemailer = require('nodemailer');

// Helper function to create token
const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Helper function to verify auth token
const checkAuth = (context) => {
  const authHeader = context.req.headers.authorization;
  if (!authHeader) {
    throw new AuthenticationError('Authorization header must be provided');
  }

  const token = authHeader.split('Bearer ')[1];
  if (!token) {
    throw new AuthenticationError('Authentication token must be \'Bearer [token]\'');
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (err) {
    throw new AuthenticationError('Invalid/Expired token');
  }
};

// Email sending function
const sendRegistrationEmail = async (email, firstName) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Student Registration System',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Welcome ${firstName}!</h2>
        <p>Thank you for registering with our Student Registration System.</p>
        <p>You can now login to update your profile and submit your marks.</p>
        <p>If you have any questions, please contact support.</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Registration email sent to', email);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  Upload: GraphQLUpload,
  
  Query: {
    getStudents: async (_, __, context) => {
      const user = checkAuth(context);
      if (user.role !== 'TEACHER') {
        throw new AuthenticationError('Not authorized');
      }
      
      return await Student.find().sort({ createdAt: -1 });
    },
    
    getStudent: async (_, { id }, context) => {
      const user = checkAuth(context);
      
      if (user.role === 'STUDENT' && user.id !== id) {
        throw new AuthenticationError('Not authorized');
      }
      
      try {
        const student = await Student.findById(id);
        if (student) {
          return student;
        } else {
          throw new Error('Student not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    
    getTeachers: async (_, __, context) => {
      const user = checkAuth(context);
      if (user.role !== 'TEACHER') {
        throw new AuthenticationError('Not authorized');
      }
      
      return await Teacher.find().sort({ createdAt: -1 });
    },
    
    getTeacher: async (_, { id }, context) => {
      const user = checkAuth(context);
      if (user.role !== 'TEACHER') {
        throw new AuthenticationError('Not authorized');
      }
      
      try {
        const teacher = await Teacher.findById(id);
        if (teacher) {
          return teacher;
        } else {
          throw new Error('Teacher not found');
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    
    getCurrentUser: async (_, __, context) => {
      try {
        const user = checkAuth(context);
        return { id: user.id, email: user.email, role: user.role };
      } catch (err) {
        return null;
      }
    }
  },
  
  Mutation: {
    registerStudent: async (_, { input: { firstName, lastName, email, password, age } }) => {
      // Check if email already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new UserInputError('Email is already taken', {
          errors: {
            email: 'This email is already taken'
          }
        });
      }
      
      // Validate age
      if (age < 18) {
        throw new UserInputError('Age must be at least 18', {
          errors: {
            age: 'Age must be at least 18'
          }
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create new user
      const user = new User({
        email,
        password: hashedPassword,
        role: 'STUDENT',
        createdAt: new Date().toISOString()
      });
      
      const result = await user.save();
      
      // Create student profile
      const student = new Student({
        user: result.id,
        firstName,
        lastName,
        email,
        age,
        marks: {
          mathematics: null,
          science: null,
          english: null,
          history: null,
          geography: null,
          computerScience: null,
          physics: null,
          chemistry: null,
          biology: null
        },
        createdAt: new Date().toISOString()
      });
      
      await student.save();
      
      // Generate JWT token
      const token = generateToken(result);
      
      // Send welcome email
      await sendRegistrationEmail(email, firstName);
      
      return {
        token,
        user: {
          id: result.id,
          email: result.email,
          role: result.role
        }
      };
    },
    
    registerTeacher: async (_, { input: { firstName, lastName, email, password } }) => {
      // Check if email already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        throw new UserInputError('Email is already taken', {
          errors: {
            email: 'This email is already taken'
          }
        });
      }
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 12);
      
      // Create new user
      const user = new User({
        email,
        password: hashedPassword,
        role: 'TEACHER',
        createdAt: new Date().toISOString()
      });
      
      const result = await user.save();
      
      // Create teacher profile
      const teacher = new Teacher({
        user: result.id,
        firstName,
        lastName,
        email,
        createdAt: new Date().toISOString()
      });
      
      await teacher.save();
      
      // Generate JWT token
      const token = generateToken(result);
      
      return {
        token,
        user: {
          id: result.id,
          email: result.email,
          role: result.role
        }
      };
    },
    
    login: async (_, { input: { email, password } }) => {
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new UserInputError('User not found', {
          errors: {
            general: 'User not found'
          }
        });
      }
      
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        throw new UserInputError('Wrong credentials', {
          errors: {
            general: 'Wrong credentials'
          }
        });
      }
      
      const token = generateToken(user);
      
      return {
        token,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      };
    },
    
    updateStudent: async (_, { id, input }, context) => {
      const user = checkAuth(context);
      
      // Only allow teachers or the student themselves to update
      if (user.role === 'STUDENT' && user.id !== id) {
        throw new AuthenticationError('Not authorized');
      }
      
      try {
        let student;
        
        if (user.role === 'TEACHER') {
          // Find student by ID for teachers
          student = await Student.findById(id);
        } else {
          // Find student by user ID for students
          student = await Student.findOne({ user: user.id });
        }
        
        if (!student) {
          throw new Error('Student not found');
        }
        
        // If email is being changed, check for uniqueness
        if (input.email && input.email !== student.email) {
          const emailExists = await User.findOne({ email: input.email });
          if (emailExists) {
            throw new UserInputError('Email is already taken');
          }
          
          // Update user email as well
          await User.findByIdAndUpdate(student.user, { email: input.email });
        }
        
        // Update student
        const updatedStudent = await Student.findByIdAndUpdate(
          id,
          { $set: input },
          { new: true }
        );
        
        return updatedStudent;
      } catch (err) {
        throw new Error(err);
      }
    },
    
    updateMarks: async (_, { id, input }, context) => {
      const user = checkAuth(context);
      
      // Only allow students to update their own marks or teachers to update any student
      let student;
      
      if (user.role === 'STUDENT') {
        student = await Student.findOne({ user: user.id });
        if (!student) {
          throw new Error('Student not found');
        }
      } else if (user.role === 'TEACHER') {
        student = await Student.findById(id);
        if (!student) {
          throw new Error('Student not found');
        }
      } else {
        throw new AuthenticationError('Not authorized');
      }
      
      // Validate mark values (0-100)
      Object.values(input).forEach(mark => {
        if (mark < 0 || mark > 100) {
          throw new UserInputError('Marks must be between 0 and 100');
        }
      });
      
      // Update student marks
      const updatedStudent = await Student.findByIdAndUpdate(
        student.id,
        { $set: { marks: input } },
        { new: true }
      );
      
      return updatedStudent;
    },
    
    uploadProfilePicture: async (_, { file }, context) => {
      const user = checkAuth(context);
      
      // Get student info
      const student = await Student.findOne({ user: user.id });
      if (!student && user.role === 'STUDENT') {
        throw new Error('Student not found');
      }
      
      // Process file upload
      const { createReadStream, filename, mimetype, encoding } = await file;
      const stream = createReadStream();
      
      // Create unique filename
      const uniqueFilename = `${user.id}-${Date.now()}-${filename}`;
      const uploadDir = path.join(__dirname, '../uploads');
      
      // Ensure upload directory exists
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }
      
      const filePath = path.join(uploadDir, uniqueFilename);
      
      // Write file to disk
      const out = fs.createWriteStream(filePath);
      stream.pipe(out);
      await finished(out);
      
      // Save file URL to student profile
      const fileUrl = `/uploads/${uniqueFilename}`;
      
      if (user.role === 'STUDENT') {
        await Student.findByIdAndUpdate(student.id, { profilePicture: fileUrl });
      }
      
      return {
        filename: uniqueFilename,
        mimetype,
        encoding,
        url: fileUrl
      };
    },
    
    deleteStudent: async (_, { id }, context) => {
      const user = checkAuth(context);
      
      // Only teachers can delete students
      if (user.role !== 'TEACHER') {
        throw new AuthenticationError('Not authorized');
      }
      
      const student = await Student.findById(id);
      if (!student) {
        throw new Error('Student not found');
      }
      
      // Delete the student's user account
      await User.findByIdAndDelete(student.user);
      
      // Delete the student profile
      await Student.findByIdAndDelete(id);
      
      return true;
    }
  }
};