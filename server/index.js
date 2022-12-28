const express = require('express');
const db = require('./dbConfig');
const cors = require('cors')
const bodyParse = require('body-parser')
const router = require('./routes/bookRoute');

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParse.json({ limit: "100mb" }))


db.connect((err, data) => {
    err ? console.log(err) : console.log('connected to db');
})

app.use('/', router)


app.listen(5000, () => {
    console.log('listening on port 5000');
})