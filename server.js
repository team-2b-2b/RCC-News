'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pg = require('pg');
// const client = new pg.Client(process.env.DATABASE_URL);
const superagent = require('superagent');
const { response, request } = require('express');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
const methodOverride = require('method-override');
server.use(methodOverride('_method'));


///////////////////////////////
// install them in your terminal: 
// npm init
//npm i express cors dotenv superagent pg method-override
//////////////////////////////



app.use(express.static('./public')); 

// somehow to be able to use post
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//to make the server look for views folder
app.set('view engine','ejs');










app.get('*', notFound);

app.use(errors);

function notFound(req, res) {
    res.status(404).send('Not Found');
}
function errors(error, req, res) {
    res.status(500).send(error);
}


// client.connect()
//     .then(() => {
app.listen(PORT, () =>
console.log(`listening on ${PORT}`)
);
// })