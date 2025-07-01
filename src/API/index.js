import axios from 'axios';

const API_BASE_URL = 'https://restaurant-app-backend20250701082739-e8febqb5epdufrgx.canadacentral-01.azurewebsites.net/api/';

export const API_ENDPOINTS = {
    ORDERS: 'Order',
    CUSTOMER: 'Customer',
    FOODITEM: 'FoodItem',
};

export const createApiEndpoint = (endpoint) => {
    const url = `${API_BASE_URL}${endpoint}/`;  

    return {
        fetchAll: () => axios.get(url),
        fetchById: id => axios.get(`${url}${id}`),
        create: newRecord => axios.post(url, newRecord),
        update: (id, updatedRecord) => axios.put(`${url}${id}`, updatedRecord),
        delete: id => axios.delete(`${url}${id}`)
    };
};
