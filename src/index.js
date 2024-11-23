require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { createUser, getToken, getClients } = require('./apiClients');
const { authorize } = require('./getToken');
const { appendData } = require('./googleSheetsClient');
const app = express();
app.use(bodyParser.json());
const SPREADSHEET_ID = process.env.SPREADSHEET_ID;

app.post('/register', async (req, res) => {
    const username = req.body.username;
    try {
        await createUser(username);
        res.send('Пользователь успешно зарегистрирован.');
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при регистрации.');
    }
});

app.post('/login', async (req, res) => {
    const username = req.body.username;
    try {
        const token = await getToken(username);
        console.log('Полученный токен:', token);
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при авторизации.');
    }
});

app.post('/fetch-data', async (req, res) => {
    const { token } = req.body;
    try {
        const clients = await getClients(token);
        res.json(clients);
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при получении данных.');
    }
});

app.post('/upload-to-sheets', async (req, res) => {
    const { token } = req.body;
    try {
        const clients = await getClients(token);
        const auth = await authorize();
        const data = clients.map(client => [
            client.id,
            client.firstName,
            client.lastName,
            client.gender,
            client.address,
            client.city,
            client.phone,
            client.email,
            client.status,
        ]);
        await appendData(auth, SPREADSHEET_ID, data);
        res.send('Данные успешно записаны в Google таблицу!');
    } catch (error) {
        console.error(error);
        res.status(500).send('Произошла ошибка при записи данных в Google таблицу.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на порту ${PORT}`);
});


