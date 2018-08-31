const express = require('express');
const rp = require('request-promise');

const preschool = 'https://mpi.mashie.com/public/menu/arvika+kommun/5adac478'
const school = 'https://mpi.mashie.com/public/menu/arvika+kommun/916571e2'

function getMenu(options) {
    return rp(options)
        .then(body => {
            data = body
                .split('\n')
                .filter(x => x.includes('weekData'))
                .map(x => x.slice(x.indexOf('{')))[0]
                .trim()
                .replace(/new Date\((\d+)\)/g, '$1')
            return JSON.parse(data)
        })
        .catch((err) => console.log(err))
}

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/school', (req, res) => {
    getMenu(school).then(menu => res.send(menu));
});

app.get('/api/preschool', (req, res) => {
    getMenu(preschool).then(menu => res.send(menu));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
