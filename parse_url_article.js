const axios = require('axios');
var HTMLParser = require('node-html-parser');
const fs = require('fs');


//Function allowing us to read the content of the rawAttrs
function getContent(str) {
    var splitted = str.split("content=")
    var splitted2 = splitted[1].replace(/\"/g,'');
    return splitted2;
}



//Parsing for one particular article

axios.get('https://medium.com/fluxx-studio-notes/the-first-rule-of-pricing-is-you-do-not-talk-about-pricing-1875caa39b89')
  .then((response) => {
    data_article = response.data;
    //console.log(data_article);
    var root = HTMLParser.parse(data_article.toString());
    var title_raw = root.querySelector('[property="og:title"][content]').rawAttrs;
    var title = getContent(title_raw);
    var author_raw = root.querySelector('[name="author"]').rawAttrs;
    var author = getContent(author_raw);
    var description_raw = root.querySelector('[name="description"]').rawAttrs;
    var description = getContent(description_raw);
    
    var published_date_raw = root.querySelector('[property="article:published_time"]').rawAttrs;
    var published_date = getContent(published_date_raw);
    //console.log(description,author,title,published_date);
        
    var data_parsed = { 
        Title: title,
        Author: author, 
        Description: description,
        TimeOfPublication: published_date,
    };
    
    
    
    var data_parsed_stringified = JSON.stringify(data_parsed);
    fs.writeFileSync('article1.json', data_parsed_stringified);
  });
      
