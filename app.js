const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const url = require('url');
const querystring = require('querystring');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 8000;

app.use(express.static(path.join(__dirname, 'build')));


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
app.get('/api/',async function(req,res){
    
        var {term,pageSize,page,category,sortBy,type,fromDate,toDate,useDate} = req.query;
        console.log(page)
        if(page==undefined)page = 1;
        if(pageSize==undefined)pageSize=10;
        
        if(sortBy==undefined)sortBy = "relevancy";
        let link= "";
        let key = "apiKey=68cbd040808b4450926076069ec8bfb6";
        if(type=="top-headlines"){
          link =`https://newsapi.org/v2/top-headlines?category=${category}&pageSize=${pageSize}&`
          
        }
        else {
          link = `https://newsapi.org/v2/everything?q=${term}&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&`
          if(useDate ="true")
           link  = link +`from=${fromDate}&to=${toDate}&`;
        }
        console.log(link+key);
        let data = await fetch(
            link + key
          );
        
        let respObj = await data.json();
        res.send(respObj);
        // console.log(respObj)
        // console.log(page)
        
        
})
app.listen(port,()=>{console.log(`Running at :${port}`)});