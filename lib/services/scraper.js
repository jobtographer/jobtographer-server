const axios = require('axios');
const fs = require('fs');

axios({
  method: 'get',
  url: 'https://www.indeed.com/jobs?q=sof&l=Portland%2C%20OR&vjk=dfc6603206039a22',
  responseType: 'stream'
})
  .then(function(response) {
    response.data.pipe(fs.createWriteStream('./data/scrapes/test.txt', 'utf8'));
  });
  
