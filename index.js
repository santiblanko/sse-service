require('dotenv').config()
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var SSE = require('express-sse');
const EventSource = require('eventsource');

const basicAuth = require('./middleware/auth.js');
const signale = require('signale')

var app = express();
app.use(cors());
// create application/json parser
app.use(bodyParser.json());
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }));
// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }));
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }));
// parse an text body into a string
app.use(bodyParser.text({ type: 'text/plain' }));
// create application/x-www-form-urlencoded parser
app.use(bodyParser.urlencoded({ extended: false }));


var sse = new SSE();
app.get('/sse', sse.init);


app.get('/', (req, res) => {
    res.send({ status: 'running' });
});

app.post('/push', function(req, res) {
    sse.send(req.body.input, req.body.eventName);
    res.send({ status: 'ok' })
});

app.listen(process.env.PORT || 8085, () => {
    signale.success(`shape.us.org SSE Listening at http://localhost:${process.env.PORT}`);
});

