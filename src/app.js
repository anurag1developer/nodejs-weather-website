const path = require('path');
const express = require('express')
const app = express()
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
const port = process.env.PORT || 3000;

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'))

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
// console.log(publicDirectoryPath);

const options = {
    extensions: ['htm', 'html']
}
const viewsPath = path.join(__dirname, '../templates/views');
// console.log(viewsPath);
const partialsPath = path.join(__dirname, '../templates/partials');
// console.log(partialsPath);


// Setup handlebars engine and views location
app.set('views', viewsPath);
app.set('view engine', 'hbs');
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath, options));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Anurag Budakoti'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Anurag Budakoti',
        imgSrc: "img/izuku_midoriya.jpg"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Anurag Budakoti',
        helpText: 'This is some helpful text.'
    })
})

app.get('/weather', (req, res) => {
    const { address } = req.query;
    if (!address) {
        return res.send({
            error: 'Address must be provided!!!'
        })
    }
    geocode(address, (error, { longitude, latitude, location } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(longitude, latitude, (error, forecastData) => {
            if (error) {
                return res.send({
                    // SHORTHAND 
                    error
                });
            }
            res.send({
                forecast: forecastData,
                location: location,
                address
            })
        });
    })
})

// app.get('/products', (req, res) => {
//     if (!req.query.search) {
//         return res.send({
//             error: 'You must provide a search term'
//         })
//     }
//     console.log(req.query.search);
//     res.send({
//         products: []
//     })

// })

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Anurag Budakoti',
        errorMsg: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Anurag Budakoti',
        errorMsg: '404, Page not found'
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})