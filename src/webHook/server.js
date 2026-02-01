require('dotenv').config({ debug: true });

const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
});

app.use(bodyParser.json());

//post endpoint to receive webhook events
// this receives call ended events from retell.ai
app.post('/', async (req, res) => {
    if (req.body && req.body.event === 'call_ended') {
        console.log('Call ended event received');
         console.log('Received webhook payload:', req.body.call.transcript);
         res.status(200).send('Webhook received');
    } else {
        res.status(400).send('Invalid event type');
    }
});

//get endpoint to fetch data from Google Sheets
//just tryingto get the data from the spreadsheet rn as a test
//TODO: implement
app.get('/read-sheet-data', async (req, res) => {
    try{
        const sheet = google.sheets({ version: 'v4', auth });

        const response = await sheet.spreadsheets.values.get({
            spreadsheetId: process.env.SHEET_ID,
            range: 'Sheet1!A1:A2',
        });

        const rows = response.data.values;
        if (rows.length) {
            console.log('Data from sheet:', rows);
        } else {
            res.status(200).send('No data found.');
        }
    } catch (err) {
    console.error('GOOGLE SHEETS ERROR ↓↓↓');
    console.error(err.message);
    if (err.response?.data) {
      console.error(JSON.stringify(err.response.data, null, 2));
    }
    res.status(500).json({ error: 'Failed to read sheet' });
  }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
