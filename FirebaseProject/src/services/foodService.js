// src/services/foodService.js
import axios from 'axios';

const API_URL = 'https://your-fake-api.com/api/foods';

export const getAllFoods = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
