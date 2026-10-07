import axios from "axios";

const api = axios.create({ baseURL: "" });

export const getRecipes = (params = {}) => api.get("/api/recipes", { params });

export const getRecipe = (id) => api.get(`/api/recipes/${id}`);

export const createRecipe = (payload) => api.post("/api/recipes", payload);

export const updateRecipe = (id, payload) => api.put(`/api/recipes/${id}`, payload);

export const deleteRecipe = (id) => api.delete(`/api/recipes/${id}`);

export default api;