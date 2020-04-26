const path = require('path');
const express = require('express');
const hbs = require('hbs');
const tempCode = require('./utils/tempCode');
const geoCode = require('./utils/geoCode');

// console.log(__dirname);
// console.log(path.join(__dirname, '../public'));

const app = express();

const port = process.env.PORT || 3000;

//Define path for Express config
const publicDirPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// express is going to find the file on the public directory and hence the below after this function never gonna run
// setup static directory to serve
app.use(express.static(publicDirPath));

app.get('', (req, res) => {
  /**
   * Since we want to make the page dynamic so we are using "hbs" library in the views folder and,
   * to render it instead og res.send() now we are using res.render(1st arg, 2nd arg)
   * 1st arg : file name,
   * 2nd arg : content to render dynamic as an object
   */
  res.render('index', {
    title: 'Weather App',
    name: 'Rishi Gupta',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Rishi Gupta',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'Happy to help you!',
    name: 'Rishi Gupta',
  });
});
//app.com
//app.com/help
//app.com/about

//call back function require 2 paramter
//1st arg is req, which is an object which is an incoming request to the server, commonly called req
//2nd arg is res, which is gonna allow what is gonna send back to th server based on the req, commonly called res

/**
 * because of above function this will never gonna run until the file on the publicDirPath was deleted
 * 
app.get('', (req, res) => {
  res.send('<h1>Hello express!<h1>');
}); */

/**
 * Since I created seperate html file on public folder, hence this is no longer needed 
 * app.get('/help', (req, res) => {
  res.send([
    {
      name: 'Rishi',
      address: 'Bangalore',
    },
    {
      name: 'Rishi',
      address: 'Bangalore',
    },
  ]);
});

app.get('/about', (req, res) => {
  res.send('<h1>About<h1>');
}); 

*/

app.get('/weather', (req, res) => {
  const { address } = req.query;
  if (!address) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  geoCode(address, (error, response = {}) => {
    if (error) {
      return res.send({ error });
    }
    const { latitude, longitude, location } = response;

    tempCode(latitude, longitude, location, (error, data) => {
      if (error) {
        return res.send({ error });
      }
      const { location, temp, humidity } = data;
      res.send({ location, temp, humidity });
    });
  });
});

app.get('/products', (req, res) => {
  const { search } = req.query;
  if (!search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }

  console.log(search);
  res.send([{ products: [] }]);
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Rishi Gupta',
    errorMessage: 'Help article not found',
  });
});
/**
 * handle 404 error
 */
app.get('*', (req, res) => {
  res.render('404', {
    title: 404,
    name: 'Rishi Gupta',
    errorMessage: '404 not found',
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
