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

//post endpoint to receive webhook events
// this receives call ended events from retell.ai
app.post('/', async (req, res) => {

    try{
        if(!req.body || req.body.event !== 'call_analyzed'){
            return res.status(400).send('Invalid event type');
        }

        const call = req.body.call;
        //console.log(req.body)
        const callId = call?.call_id || '';
        const firstName = call?.collected_dynamic_variables?.first_name || '';
        const timeStamp = new Date().toString();
        const transcript = call?.transcript || '';
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
    //for testing purposes
    /*
    if (req.body) {
       // console.log('Call ended event received');
         console.log(req.body.call);
         res.status(200).send('Webhook received');
    } else {
        res.status(400).send('Invalid event type');
    } */
});

//get endpoint to fetch data from Google Sheets
//just tryingto get the data from the spreadsheet rn as a test
//Ight this works now gonna do the actual implementation
/*
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
}); */


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
