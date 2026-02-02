require('dotenv').config({ debug: true });

const express = require('express');
const bodyParser = require('body-parser');
const { google } = require('googleapis');

const app = express();
const PORT = process.env.PORT || 3000;
const SHEET_ID = process.env.SHEET_ID;

const auth = new google.auth.GoogleAuth({
    keyFile: process.env.GOOGLE_SERVICE_ACCOUNT_JSON,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheet = google.sheets({ version: 'v4', auth });

app.use(bodyParser.json());

app.post('/', async (req, res) => {

    try{
        if(!req.body || req.body.event !== 'call_analyzed'){
            return res.status(400).send('Invalid event type');
        }

        const call = req.body.call;
        const callId = call?.call_id || '';
        const firstName = call?.collected_dynamic_variables?.first_name || '';
        const timeStamp = new Date().toString();
        const transcript = call?.transcript || '';
        const audio = call?.recording_url || '';
        const disonnectedReason = call?.disconnection_reason || '';

        console.log(transcript);

        await sheet.spreadsheets.values.append({
            spreadsheetId: process.env.SHEET_ID,
            range: 'Sheet1!A:E',
            valueInputOption: 'USER-ENTERED',
            requestBody: {
                values: [[
                    callId,
                    firstName,
                    timeStamp,
                    transcript,
                    audio,
                    disonnectedReason
                ]]
            }
        });
        console.log('written')
         res.status(200).send('Received and processed');
    } catch(err){
        console.error("ERROR:")
        console.error(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
