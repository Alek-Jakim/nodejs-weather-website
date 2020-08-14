const express = require('express');
const path = require('path')
const app = express();
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

// Define paths for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static dir to serve
app.use(express.static(publicDirPath));



// Get
app.get('', (req, res) => {
    res.render('index', {
        title: 'OpenCloud Weather',
        name: 'Aleksandar Jakimovski'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Aleksandar Jakimovski'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Contact',
        helpMsg: 'You can simply contact me at alek.jakimovski1@gmail.com',
        name: 'Aleksandar Jakimovski'
    })
})

//Weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address!'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})


//Error
app.get('/help/*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Aleksandar Jakimovski',
        error: 'Contact Page Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404-page', {
        title: '404',
        name: 'Aleksandar Jakimovski',
        error: 'Page Not Found'
    })
})

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})

//app.com
//app.com/help
//app.com/about