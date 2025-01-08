import axios from "axios";

const apiUrl = import.meta.env.VITE_API_URL;

const api = axios.create({
    baseURL: `${apiUrl}/api`,
    headers: {
        "Content-Type": "application/json",
    },
});

export const getAllPeople = async () => {
    try {
        const response = await api.get("/people");
        console.log(response)
        return response.data;
    } catch (error) {
        console.error("Error fetching persons:", error);
        throw error
    }
};

export const createPeople = async (peopleData) => {
    try {
        const response = await api.post("/people", peopleData);
        return response.data;
    } catch (error) {
        console.error("Error creating person:", error);
        throw error;
    }
};

export const updatePeople = async (id, peopleData) => {
    try {
        const response = await api.put(`/people/${id}`, peopleData);
        return response.data;
    } catch (error) {
        console.error("Error updating person:", error);
        throw error;
    }
};

export const deletePeople = async (id) => {
    try {
        const response = await api.delete(`/people/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting person:", error);
        throw error;
    }
};