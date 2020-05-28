const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');


var router = express.Router();

const bcrypt = require('bcrypt');
const app = express();

const db = require('./models');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const PORT = process.env.PORT || 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(
    session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,
        cookie: {
            // secure: true, 
        maxAge: 6000000,
    }
}));


app.use('/', indexRouter);
app.use('/users', usersRouter);
function checkAuthentication(req, res, next) {
    if (req.session.user) {
      next();
    } else {
      res.redirect('/users/login');
    }
  }
  
app.get('/dashboard', checkAuthentication, (req, res) => {
    req.send('WELCOME TO THE DASHBOARD!!');
})
//users
// app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.get('/index')
/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('users.ejs');
  });
  
  router.post('/', (req, res) => {
    const { username, email, password } = req.body;
  
    bcrypt.hash(password, 10, (err, hash) => {
  
      db.User.create({
        username,
        email,
        password: hash,
      }).then((result) => {
        res.redirect('/users')
      });
    });
  });
//   module.exports = router;
  

//routes
app.get('/index', (req, res) => {
    res.send('Hello');
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

app.get('/artist/:id/albums', (req, res) => {
    db.Artist.findByPk(req.params.id).then(Artist => {
        return Artist.getAlbum()
    }).then ((result) => {
        res.json(result);
    })
});

app.get('/albums', (req, res) => {
    db.Album.findAll().then((result) => {
        res.json(result);
    });
});

app.get('/albums/:id', (req, res) => {
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

