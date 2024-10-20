import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const registerUser = (userData) => axios.post(`${API_URL}/register`, userData);
export const loginUser = (userData) => axios.post(`${API_URL}/login`, userData);
export const getEventDetails = () => axios.get(`${API_URL}/event-details`);
