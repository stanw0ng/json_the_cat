const request = require('request');

const fetchBreedDescription = function(breedName, callback) {
  const urlSearch = 'https://api.thecatapi.com/v1/breeds/search?q=';
  const url = urlSearch + breedName;

  request(url, (error, response, body) => {
    
    //failures from
    if (error) {
      callback(error, null); // if error, invoke the callback where the error param is the error produced by request() and description is null
      return;
    }

    if (response.statusCode !== 200) {
      const errorMsg = `Invalid status code: ${response.statusCode}`;
      callback(errorMsg, null); // if error, invoke the callback where the error param is the errorMsg and description is null
      return;
    }

    // successful request
    const data = JSON.parse(body);

    // successful request BUT no such breed found through search
    if (data.length === 0) {
      const errorMsg = `${breedName} not found!`;
      callback(errorMsg, null); // if error (but still successful request), invoke the callback where the error param is the errorMsg and description is null
      return;
    }

    const breedDescription = data[0].description;
    callback(null, breedDescription); // if request is succesful AND search has match, invoke the callback where the error param is null and description is breedDescription
  });
};

module.exports = {fetchBreedDescription};
