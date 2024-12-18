import axios from 'axios';

// Backend API base URL
const API_BASE_URL = 'http://localhost:8080/api/tasks';

// Define API calls
export const getTasks = () => axios.get(API_BASE_URL);
export const createTask = (task) => axios.post(API_BASE_URL, task);
export const updateTask = (id, task) => axios.put(`${API_BASE_URL}/${id}`, task);
export const deleteTask = (id) => axios.delete(`${API_BASE_URL}/${id}`);
