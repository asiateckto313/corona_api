const  PORT = 4000;
const fs = require('fs'); //Maybe to write what I scraped as an output in a json file

let app = require("express")(),
    server = require("http").createServer(app),
    bodyParser = require("body-parser"),
    coronaUtils = require("./utils/corona"),
    apiRouter = require("./apiRouter").router;


//App configuration
app.use(bodyParser.urlencoded({extended: true})); 
app.use(bodyParser.json()); // We're going to parse some json
app.use('/api/',apiRouter);

app.get("/",function(req,res){
    let ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    console.log("IP Address : ",ip);
    return res.status(200)
    .json({'error':false, 'data':'Bienvenu(e) sur notre API, appelez un service en utilisant la syntaxe suivante : adresseServer/api/corona/nomService'})
})

app.get("/a",function(req,res){
    return res.status(200).end(JSON.stringify({'Eeebgb':"fedf",'data':"vfevd"})) 
})


app.get("/countriesInfo", function(req, res){
    coronaUtils.countriesInfo(req,res);
})

server.listen(PORT, function(){
    console.log("Server is running on port : ",PORT);
})