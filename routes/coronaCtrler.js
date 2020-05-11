
//Imports
let url = require('url'), queryString = require("querystring"), coronaUtils = require("../utils/corona");

    
module.exports = {
    countriesInfo : function(req,res){
        //Return all info about each country
        coronaUtils.countriesInfo(req,res);
    },
    countriesList :  function(req,res){
        //Will return the list of the infected countries by worldometers source
        coronaUtils.countriesList(req,res);
    },
    countryInfo :  function(req, res){
        //Want to know the corona info about a specific country
        let params = queryString.parse(url.parse(req.url).query),
        countryToSearch = params['country'];
        console.log("params = ",countryToSearch)
        if(countryToSearch == undefined || countryToSearch == ""|| countryToSearch.length<3)
            return res.status(400).json({'error':true,'error_msg':'country to search is missing'})
        else{
            coronaUtils.countryInfo(req,res,countryToSearch)
        }
    },
    ivoryCoastInfo :  function(req, res){
        //Want to know the corona info about a specific country
        let params = queryString.parse(url.parse(req.url).query),
        countryToSearch = params['country'];
        console.log("params = ",countryToSearch)
        if(countryToSearch == undefined || countryToSearch == "")
            return res.status(400).json({'error':true,'error_msg':'country to search is missing'})
        else{
            coronaUtils.ivoryCoastInfo(req, res, countryToSearch)
        }
    }
  
}