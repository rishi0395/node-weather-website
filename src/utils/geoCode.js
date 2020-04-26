const request = require('request');

const geoCode = (city, callback) => {
  const geocoding = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    city
  )}.json?access_token=pk.eyJ1IjoicmlzaGkwMzk1IiwiYSI6ImNrOWU1N3ZwbDBhdjgzZW9hN2UwMWlyMG0ifQ.qwuc334npGQsTdvpG_aMIQ&limit=1`;

  request({ url: geocoding, json: true }, (err, res) => {
    if (err) {
      callback('Unable to connect to the geocoding app');
    } else if (res.body.features.length === 0) {
      callback('Unable to find the city, try another search');
    } else {
      const [{ place_name, center }] = res.body.features;
      callback(undefined, {
        location: place_name,
        latitude: center[0],
        longitude: center[1],
      });
    }
  });
};

module.exports = geoCode;
