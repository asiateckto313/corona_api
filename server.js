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
app.get("/scape",function(req, res){
    
})
app.get("/countriesInfo", function(req, res){
    coronaUtils.countriesInfo(req,res);
})

server.listen(PORT, function(){
    console.log("Server is running on port : ",PORT);
})