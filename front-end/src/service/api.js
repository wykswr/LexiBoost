import axios from "axios";


export const api = axios.create({
        baseURL: "http://localhost:8000/api",
    }
);



// export const getTags = async () => {
//     const response = await api.get("/tags");
//     return response.data;
// }

export const getTags = async () => {
    return ["English", "French", "Chinese", "Japanese", "Korean", "German", "Spanish", "Italian", "Russian", "Portuguese"];
}



export const getDeckIds = async () => {
    return [1, 2, 3, 4, 5, 6];
}