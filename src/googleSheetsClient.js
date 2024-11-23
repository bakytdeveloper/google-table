require('dotenv').config();
const { google } = require('googleapis');

async function appendData(auth, spreadsheetId, data) {
    const sheets = google.sheets({ version: 'v4', auth });
    const resource = { values: data };
    await sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        resource,
    });
}

module.exports = { appendData };
