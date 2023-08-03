const express = require('express');
const config = require('config');
const app = express()

app.use(express.urlencoded({ limit: '5mb' }));
app.use(express.json({ limit: '5mb' }));
app.use((req, res, next) => {
    req.config = { env: config.get('env'), token: config.get('token') };
    next();
});

module.exports = {
    handler: app
}