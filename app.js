const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require('./models');



//routes
app.get('/', (req, res) => {
    db.Artist.findAll().then((result) => {
        res.json(result);
    })
})
app.get('/:id', (req, res) => {
    db.Artist.findByPk(req.params.id).then(result => {
        res.json(result);
    });
});

app.listen(PORT, () => console.log(`The Server is running on Http://localhost:${PORT}`));
