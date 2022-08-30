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
    
        var {term,pageSize,page,category,sortBy,type} = req.query;
        console.log(page)
        if(page==undefined)page = 1;
        if(pageSize==undefined)pageSize=10;
        if(type==undefined)type = everything
        if(sortBy==undefined)sortBy = "relevancy"
        let data= await fetch(
            `https://newsapi.org/v2/everything?q=${term}&sortBy=${sortBy}&pageSize=${pageSize}&page=${page}&apiKey=68cbd040808b4450926076069ec8bfb6`
            );
        let respObj = await data.json();
        res.send(respObj);
        console.log(page)
        
        
})
app.listen(port,()=>{console.log(`Running at :${port}`)});