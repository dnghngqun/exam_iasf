import axios from 'axios';

const API_URL = 'http://localhost:8080/api/employees';

const apiClient = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getEmployees = (params) => {
    return apiClient.get('', { params });
};

export const getEmployeeById = (id) => {
    return apiClient.get(`/${id}`);
};

export const createEmployee = (data) => {
    return apiClient.post('', data);
};

export const getStatistics = () => {
    return apiClient.get('/statistics/cost');
};