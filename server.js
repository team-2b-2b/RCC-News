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
    if (data.urlToImage) {
        this.urlToImage = data.urlToImage;
    } else { this.urlToImage = `https://previews.123rf.com/images/artinspiring/artinspiring1805/artinspiring180500364/101214558-politics-concept-illustration-idea-of-political-institution-.jpg`; }
    this.description = data.description;
    this.url = data.url;
}
// ----------------------------------------------------------------



// ------------------------------------Basma-----------------------
app.post('/hcomments/:comnth_id', (req, res) => {
    let postNum = req.params.comnth_id;
    // console.log(postNum);
    let SQL = `INSERT INTO healthcomments (post,comment) VALUES ($1,$2);`;
    let values = [postNum,req.body.Ntext];
    client.query(SQL, values)
        .then(() => {
            // let SQL2 = `SELECT * FROM comments`
            // client.query(SQL2)
            //     .then(results => {
                    res.redirect('/health');
            //     })
            
        })
})
app.get('/health', (req, res) => {
    let health_API = process.env.health_API;
    let url = `http://newsapi.org/v2/top-headlines?category=health&country=us&apiKey=${health_API}`;
    let healthArray = [];
    superagent(url)
        .then(result => {
            healthArray = result.body.articles.map(item => {
                return new Health(item);
            })
            // res.status(200).json(healthArray);
            let SQL2 = `SELECT * FROM healthcomments;`;
            client.query(SQL2)
                .then(results => {
                    // console.log(results.rows);
                    // res.render('pages/health', {results: results.rows});
                    res.render('pages/health', { healthData: healthArray, results: results.rows });
                })

        })
});

function Health(data) {
    this.title = data.title;
    if (data.urlToImage) {
        this.urlToImage = data.urlToImage;
    } else { this.urlToImage = `https://lh3.googleusercontent.com/proxy/tI8M3GhQWTvdQRffsevjnCjCbElBP-OEH6BmgIvZ6-At1yFcXmRljMHJ5Kan-927_Nr-iAt0JLWrYa2oP1iK9IqbVTUoTP617BWbnKLNXEk-VUopH0PUkuh_n6feHLSlXnSnUPTH9N2CebCR0n8gM6DvO8yon-muPtKl6RNf4yg_NRBlKJc`; }
    this.description = data.description;
    this.url = data.url;
}
// ----------------------------------------------------------------



// ------------------------------------Nimrawi-----------------------
app.post('/tcomments/:comntt_id', (req, res) => {
    let postNum = req.params.comntt_id;
    // console.log(postNum);
    let SQL = `INSERT INTO techcomments (post,comment) VALUES ($1,$2);`;
    let values = [postNum,req.body.Ntext];
    client.query(SQL, values)
        .then(() => {
            // let SQL2 = `SELECT * FROM comments`
            // client.query(SQL2)
            //     .then(results => {
                    res.redirect('/tech');
            //     })
            
        })
})
app.get('/tech', (req, res) => {
    let Tech_API = process.env.Tech_API;
    let url = `http://newsapi.org/v2/top-headlines?category=technology&country=us&apiKey=${Tech_API}`;
    let techArray = [];
    superagent(url)
        .then(result => {
            techArray = result.body.articles.map(item => {
                return new Tech(item);
            })
            // res.status(200).json(techArray);
            let SQL2 = `SELECT * FROM techcomments;`;
            client.query(SQL2)
                .then(results => {
                    // console.log(results.rows);
                    // res.render('pages/tech', {results: results.rows});
                    res.render('pages/tech', { techData: techArray, results: results.rows });
                })

        })
});

function Tech(data) {
    this.title = data.title;
    if (data.urlToImage) {
        this.urlToImage = data.urlToImage;
    } else { this.urlToImage = `https://i.nextmedia.com.au/News/CRN_690_coding.jpg`; }
    this.description = data.description;
    this.url = data.url;
}
// ----------------------------------------------------------------



// ------------------------------------Ghafri-----------------------
app.post('/scomments/:comnts_id', (req, res) => {
    let postNum = req.params.comnts_id;
    // console.log(postNum);
    let SQL = `INSERT INTO sportcomments (post,comment) VALUES ($1,$2);`;
    let values = [postNum,req.body.Ntext];
    client.query(SQL, values)
        .then(() => {
            // let SQL2 = `SELECT * FROM comments`
            // client.query(SQL2)
            //     .then(results => {
                    res.redirect('/sport');
            //     })
            
        })
})
app.get('/sport', (req, res) => {
    let sport_API = process.env.sport_API;
    let url = `http://newsapi.org/v2/top-headlines?category=sport&country=us&apiKey=${sport_API}`;
    let sportArray = [];
    superagent(url)
        .then(result => {
            sportArray = result.body.articles.map(item => {
                return new Sport(item);
            })
            // res.status(200).json(sportArray);
            let SQL2 = `SELECT * FROM sportcomments;`;
            client.query(SQL2)
                .then(results => {
                    // console.log(results.rows);
                    // res.render('pages/sport', {results: results.rows});
                    res.render('pages/sport', { sportData: sportArray, results: results.rows });
                })

        })
});

function Sport(data) {
    this.title = data.title;
    if (data.urlToImage) {
        this.urlToImage = data.urlToImage;
    } else { this.urlToImage = `https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR68KlBNlBfL6n8ujQTRzl6X0YBTIcmLhDXEQ&usqp=CAU`; }
    this.description = data.description;
    this.url = data.url;
}
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