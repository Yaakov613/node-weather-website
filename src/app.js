const path = require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

//define paths for express config
const publicDirectoryPath = (path.join(__dirname, '../public'))
const viewsPath = path.join(__dirname, '../templates/views')
partialsPath = path.join(__dirname, '../templates/partials')

//setup static directory to serve
app.use(express.static(publicDirectoryPath))

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        name: 'Yaakov Diamond',
        title: ' this is the home page for my website'
    })
})
app.get('/weather', (req, res) => {
        const address = req.query.address
    if (!address) {
        return res.send({ error: 'No address has been  provided' })
    }
    else 
    geocode(address, (error, { latitude, longitude, location }= {}) => {
        if (error) { return res.send({error: error})}


    forecast(latitude, longitude, (error, foreCastData) => {
            if (error) { return res.send({error: error}) }

           res.send({
               location,
               Forecast:foreCastData,
               address,
           })
        })
    })
}
)



// const address = process.argv[2]

// if (!address) { console.log(`sorry, you have not provided a location to search for`) }


//


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'welcome to the about page!!!',
        name: 'Yaakov Diamond'
    })
})
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'this is the help page!!',
        name: 'Yaakov Diamond'
    })
})

app.get('/products', (req, res) => {

    if (!req.query.search) {
        return res.send(
            { error: 'You must provide a search term' }
        )
    }
    console.log(req.query.search)
    res.send({
        products: []
    })


})

app.get('/help/*', (req, res) => {
    res.render('helperror', {
        title: 'help article not found',
        name: 'Yaakov Diamond'
    })
})

app.get('*', (req, res) => {
    res.render('randomerror',
        {
            title: 'Page not found',
            name: 'Yaakov Daimond'
        })
    debugger
})

//  const address = (process.argv[2])
// console.log(process.argv[2])



// app.get('/about', (req, res) => {
//     res.send('<h1>ABOUT</h1>')
// })
// app.get('', (req, res) => {
//     res.send('<h1>WEATHER</h1>')
// })
// app.get('/help', (req, res) => {
//     res.send({
//         name: 'yaakov',
//         age: 24
//     })})




// app.get('/weather', (req, res) => {
//         res.send({
//             forecast: '50 degrees',
//             location: 'philadelphia'
//         })
//     })
console.log('server is up')

app.listen(3000, () => {

})


//andrews code

// const path = require('path')
// const express = require('express')
// const hbs = require('hbs')

// const app = express()

// // Define paths for Express config
// const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../templates/views')
// const partialsPath = path.join(__dirname, '../templates/partials')

// // Setup handlebars engine and views location
// app.set('view engine', 'hbs')
// app.set('views', viewsPath)
// hbs.registerPartials(partialsPath)

// // Setup static directory to serve
// app.use(express.static(publicDirectoryPath))

// app.get('', (req, res) => {
//     res.render('index', {
//         title: 'Weather',
//         name: 'Andrew Mead'
//     })
// })

// app.get('/about', (req, res) => {
//     res.render('about', {
//         title: 'About Me',
//         name: 'Andrew Mead'
//     })
// })

// app.get('/help', (req, res) => {
//     res.render('help', {
//         helpText: 'This is some helpful text.',
//         title: 'Help',
//         name: 'Andrew Mead'
//     })
// })

// app.get('/weather', (req, res) => {
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Philadelphia'
//     })
// })

// app.listen(3000, () => {
//     console.log('Server is up on port 3000.')
// })