const express = require('express');
const app = express();
const path =  require('path');
const morgan = require('morgan');
const cors = require('cors')
const mysql = require('mysql');
const myConnection = require('express-myconnection');
global.fetch = require('node-fetch');
const bodyParser = require('body-parser');

//importacion de las rutas
const pokemonRoutes = require('./routes/pokemon');
const pokeapi = require('./public/pokemonBuscar');
const { urlencoded } = require('express');


app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));


app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'));

app.use(myConnection(mysql, {
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'pokedex'
}, 'single'));
app.use(express.urlencoded({extended: false}));

//rutas
app.use('/', pokemonRoutes);

//configuracion de archivos estaticos
app.use(express.static(path.join(__dirname, '/public')));

app.listen(3000, () => {
    console.log('Escuchando en puerto 3000');
});

