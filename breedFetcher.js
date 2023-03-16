const request = require('request');

const urlSearch = 'https://api.thecatapi.com/v1/breeds/search?q=';
const breed = process.argv[2];

const url = urlSearch + breed; // get URL from command line argument

request(url, (error, response, body) => {
  if (error) {
    console.error(error);
    return;
  }

  if (response.statusCode !== 200) {
    console.error(`Invalid status code: ${response.statusCode}`);
    return;
  }

  // converts body (previously a string) into a JSON object and stores it as a variable called data
  const data = JSON.parse(body);
  // console.log(data);
  // console.log(typeof data);

  if (data.length === 0) {
    console.error(`Error: ${breed} not found!`);
    return;
  }
  
  // otherwise access the description of the breed
  console.log(data[0].description);

});