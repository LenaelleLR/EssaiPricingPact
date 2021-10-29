const axios = require('axios');
var HTMLParser = require('node-html-parser');
const fs = require('fs');

axios.get('https://medium.com/search?q=pricing').then((response) => {
    data_page = response.data;
    //console.log(data_page);
    const root = HTMLParser.parse(data_page);
    var article_content = root.querySelectorAll('.postArticle-content');
    console.log(article_content);
    
    var data_parsed_stringified = JSON.stringify(data_page);
    fs.writeFileSync('article2.json', data_parsed_stringified);
  });
      