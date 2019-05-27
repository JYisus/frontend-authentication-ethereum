const express = require('express');
const bodyParser = require('body-parser');
const os = require('os');
const controlAcceso = require('./blockchain/blockchainConnect');


const app = express();
app.use(bodyParser.json()); // soporte para bodies codificados en jsonsupport
app.use(bodyParser.urlencoded({ extended: true })); // soporte para bodies codificados

app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.post('/api/register', controlAcceso.register);
app.post('/api/delete', controlAcceso.removeHost);
app.post('/api/login', controlAcceso.login);
app.post('/api/getNonce', controlAcceso.getNonce);

app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
