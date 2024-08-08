import axios from 'axios';


const API_URL = 'http://localhost:9000/api/students';

export const getStudents = (page = 1, limit = 10) => {
  return axios.get(`${API_URL}/getStudents?page=${page}&limit=${limit}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching students:', error);
      throw error;
    });
};

export const getStudentById = (id) => {
  return axios.get(`${API_URL}/getStudentById/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error fetching student ${id}:`, error);
      throw error;
    });
};

export const createStudent = (studentData) => {
  return axios.post(`${API_URL}/register`, studentData)
    .then(response => response.data)
    .catch(error => {
      console.error('Error creating student:', error);
      throw error;
    });
};

export const updateStudent = (id, studentData) => {
  return axios.patch(`${API_URL}/updateStudent/${id}`, studentData)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error updating student ${id}:`, error);
      throw error;
    });
};

export const deleteStudent = (id) => {
  return axios.delete(`${API_URL}/deleteStudent/${id}`)
    .then(response => response.data)
    .catch(error => {
      console.error(`Error deleting student ${id}:`, error);
      throw error;
    });
};
