const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');



//routes
app.get('/index', (req, res) => {
    console.log('Hello');
    // res.json(result);
    // db.Artist.findAll().then((result) => {
    //     res.json(result);
    // })
})

app.get('/artist', (req, res) => {
    db.Artist.findAll().then((result) => {
        res.json(result);
    })
})
app.get('/artist/:id', (req, res) => {
    db.Artist.findByPk(req.params.id).then(result => {
        res.json(result);
    });
});

app.get('/album', (req, res) => {
    db.Album.findAll().then((result) => {
        res.json(result);
    });
});

app.get('/album/:id', (req, res) => {
    db.Album.findByPk(req.params.id).then((result) => {
        res.json(result);
    });
});

app.get('/track', (req, res) => {
    db.Track.findAll().then((result) => {
        res.json(result);
    });
});

app.get('/track/:id', (req, res) => {
    db.Track.findByPk(req.params.id).then((result) => {
        res.json(result);
    });
});

// app.post('/newartist', (req, res) => {
//     const name = req.body.name;

//     db.Artist.create({
//         name: name
//     }).then((result) => {
//         res.json(result);
//     });
// });

//create artist
app.post('/artist', (req, res) => {
    db.Artist.create({
        name: req.body.name,
    }).then(result => {
        res.json(result);
    });
});

app.post('/artist/:artist_id/album', (req, res) => {
    db.Artist.findByPk(req.params.artist_id)
    .then(artist => {
        return artist.createAlbum({
            name: req.body.name,
            year: req.body.year,
        })
    .then((result) => {
        res.json(result);
    })
    })
});

app.post('/artist/:artist_id/album/:album_id/track', (req, res) => {
    db.Album.findByPk(req.params.album_id)
        .then(album => {
            return album.createTrack({
                name: req.body.name,
                duration: req.body.duration,
            })
        })
})

app.listen(PORT, () => console.log(`The Server is running on Http://localhost:${PORT}`));
