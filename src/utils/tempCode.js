const request = require('request');

// apikey = 'a5156fe76283035685cc8a4aa5d086e2'
const tempCode = (lat, lon, location, callback) => {
  const apiKey = '886705b4c1182eb1c69f28eb8c520e20';
  const tempUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

  request({ url: tempUrl, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to the tempCoding app');
    } else if (res.body.cod == 400) {
      callback('Unable to find the search city');
    } else {
      const {
        main: { temp, humidity },
      } = res.body;
      callback(undefined, { temp, humidity, location });
    }
  });
};

module.exports = tempCode;
