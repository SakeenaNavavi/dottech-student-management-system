// File: graphql/typeDefs.js
const { gql } = require('apollo-server-express');

module.exports = gql`
  scalar Upload
  
  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }
  
  type Student {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    age: Int!
    profilePicture: String
    marks: Marks
    createdAt: String!
  }
  
  type Marks {
    mathematics: Float
    science: Float
    english: Float
    history: Float
    geography: Float
    computerScience: Float
    physics: Float
    chemistry: Float
    biology: Float
  }
  
  type Teacher {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    createdAt: String!
  }
  
  type Auth {
    token: String!
    user: User!
  }
  
  type User {
    id: ID!
    email: String!
    role: String!
  }
  
  input RegisterStudentInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
    age: Int!
  }
  
  input RegisterTeacherInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  
  input LoginInput {
    email: String!
    password: String!
  }
  
  input UpdateStudentInput {
    firstName: String
    lastName: String
    email: String
    age: Int
  }
  
  input MarksInput {
    mathematics: Float
    science: Float
    english: Float
    history: Float
    geography: Float
    computerScience: Float
    physics: Float
    chemistry: Float
    biology: Float
  }
  
  type Query {
    getStudents: [Student]!
    getStudent(id: ID!): Student
    getTeachers: [Teacher]!
    getTeacher(id: ID!): Teacher
    getCurrentUser: User
  }
  
  type Mutation {
    registerStudent(input: RegisterStudentInput!): Auth!
    registerTeacher(input: RegisterTeacherInput!): Auth!
    login(input: LoginInput!): Auth!
    updateStudent(id: ID!, input: UpdateStudentInput!): Student!
    updateMarks(id: ID!, input: MarksInput!): Student!
    uploadProfilePicture(file: Upload!): File!
    deleteStudent(id: ID!): Boolean!
  }
`;