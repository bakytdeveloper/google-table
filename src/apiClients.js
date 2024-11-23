// const axios = require('axios');
// const API_BASE_URL = 'http://94.103.91.4:5000';
//
// async function createUser(username) {
//     const response = await axios.post(`${API_BASE_URL}/auth/registration`, { username });
//     return response.data;
// }
//
// async function getToken(username) {
//     const response = await axios.post(`${API_BASE_URL}/auth/login`, { username });
//     return response.data.token;
// }
//
// async function getClients(token) {
//     console.log('Используемый токен для запроса клиентов:', token);
//     const response = await axios.get(`${API_BASE_URL}/clients`, {
//         headers: {
//             'accept': '*/*',
//             'Authorization': `${token}`,
//         },
//         params: {
//             limit: 1000,
//             offset: 1000,
//         },
//     });
//     return response.data;
// }
//
// module.exports = { createUser, getToken, getClients };


require('dotenv').config();
const axios = require('axios');
const API_BASE_URL = process.env.API_BASE_URL;

async function createUser(username) {
    const response = await axios.post(`${API_BASE_URL}/auth/registration`, { username });
    return response.data;
}

async function getToken(username) {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username });
    return response.data.token;
}

async function getClients(token) {
    console.log('Используемый токен для запроса клиентов:', token);
    const response = await axios.get(`${API_BASE_URL}/clients`, {
        headers: {
            'accept': '*/*',
            'Authorization': `${token}`,
        },
        params: {
            limit: 1000,
            offset: 1000,
        },
    });
    return response.data;
}

module.exports = { createUser, getToken, getClients };
