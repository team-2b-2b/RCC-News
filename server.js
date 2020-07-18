'use strict';
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL);
const superagent = require('superagent');
const { response, request } = require('express');

const PORT = process.env.PORT || 5000;
const app = express();
app.use(cors());
const methodOverride = require('method-override');
app.use(methodOverride('_method'));


///////////////////////////////
// install them in your terminal: 
// npm init
//npm i express cors dotenv superagent pg method-override
//////////////////////////////




app.use(express.static('./public'));

// somehow to be able to use post
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//to make the server look for views folder
app.set('view engine', 'ejs');


// ------------------------------------Dana-----------------------
app.get('/pages/news', (req, res) => {
    res.render('pages/news');
})
app.get('/', (req, res) => {
    res.render('index');
})

app.post('/comments/:comnt_id', (req, res) => {
    let postNum = req.params.comnt_id;
    // console.log(postNum);
    let SQL = `INSERT INTO comments (post,comment) VALUES ($1,$2);`;
    let values = [postNum,req.body.Ntext];
    client.query(SQL, values)
        .then(() => {
            // let SQL2 = `SELECT * FROM comments`
            // client.query(SQL2)
            //     .then(results => {
                    res.redirect('/news');
            //     })
            
        })
})

app.get('/news', (req, res) => {
    let NEWS_API = process.env.NEWS_API;
    let url = `http://newsapi.org/v2/top-headlines?category=politics&country=us&apiKey=${NEWS_API}`;
    let newsArray = [];
    superagent(url)
        .then(result => {
            newsArray = result.body.articles.map(item => {
                return new News(item);
            })
            // res.status(200).json(newsArray);
            let SQL2 = `SELECT * FROM comments;`;
            client.query(SQL2)
                .then(results => {
                    // console.log(results.rows);
                    // res.render('pages/news', {results: results.rows});
                    res.render('pages/news', { newsData: newsArray, results: results.rows });
                })

        })
});

function News(data) {
    this.title = data.title;
    this.urlToImage = data.urlToImage;
    this.description = data.description;
    this.url = data.url;
}
// ----------------------------------------------------------------



// ------------------------------------Basma-----------------------

// ----------------------------------------------------------------



// ------------------------------------Nimrawi-----------------------

// ----------------------------------------------------------------



// ------------------------------------Ghafri-----------------------

// ----------------------------------------------------------------


app.get('*', notFound);

app.use(errors);

function notFound(req, res) {
    res.status(404).send('Not Found');
}
function errors(error, req, res) {
    res.status(500).send(error);
}


client.connect()
    .then(() => {
        app.listen(PORT, () =>
            console.log(`listening on ${PORT}`)
        );
    })