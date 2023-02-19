import axios from 'axios';
// let token = localStorage.getItem('TOKEN');
// if (token) {
//     token = token?.slice(1, token.length - 1);
// }
const request = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${localStorage.getItem('TOKEN')}`,
        type: 'formData',
    },
});

export const get = async (path, options = {}) => {
    const response = await request.get(path, options);
    return response.data;
};

export const post = async (path, options = {}) => {
    const response = await request.post(path, options);
    return response.data;
};
export const Delete = async (path, options = {}) => {
    const response = await request.delete(path, options);
    return response.data;
};
export const patch = async (path, options = {}) => {
    const response = await request.patch(path, options);
    return response.data;
};
export default request;
