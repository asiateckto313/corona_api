const URL = "https://www.worldometers.info/coronavirus/";

//Imports
let https = require("https"), queryString = require("querystring"),
    request = require("request"),
    cheerio = require('cheerio');

let getCoronaIvoryCoastInfo = async function(req,res){
    request(URL, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request

        if(!error){
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

        let $ = cheerio.load(html);

        // Finally, we'll define the variables we're going to capture

        let json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};

        $('#main_table_countries_today > tbody:nth-child(2) > tr:nth-child(94)').filter(function(){
            //normalement nous sommes sur la ligne Ivory Coast
            // Let's store the data we filter into a variable so we can easily see what's going on.

            let data = $(this),
            children = data.children();
            children.each(function(i,elem){
                switch(i){
                    case 0 : json.country = $(this).text().trim()
                    break;

                    case 1 : json.total_cases = $(this).text().trim()
                    break;

                    case 2 : json.new_cases = $(this).text().trim()
                    break;

                    case 3 : json.total_deaths = $(this).text().trim()
                    break;

                    case 4 : json.new_deaths = $(this).text().trim()
                    break;

                    case 5 : json.total_recovered = $(this).text().trim()
                    break;
                    
                }
            })

                    
        })
        if(json.country == ""){
            //The json object is empty
            console.log("ivoryCoastInfo invoked empty");
            return res.status(200).json({'error': true,'error_msg':"Empty json object",'data':json});
        }else{
            //The json object is not empty
            console.log("ivoryCoastInfo invoked");
            return res.status(200).json({'error': false,'data':json});

        }
        
    }
})

    await new Promise((resolve, reject) => setTimeout(resolve, 300));

}
module.exports = {
    countriesList :  function(req,res){
        //Will return the list of the infected countries by worldometers source
            console.log("boo")
    },
    countryInfo : function(req, res){
        //Want to know the corona info about a specific country
    },
    ivoryCoastInfo : function(req,res){
        getCoronaIvoryCoastInfo(req,res);
    }  /*async function(req, res){
        // The structure of our request call
        // The first parameter is our URL
        // The callback function takes 3 parameters, an error, response status code and the html
       request(URL, function(error, response, html){
            // First we'll check to make sure no errors occurred when making the request

            if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

            let $ = cheerio.load(html);

            // Finally, we'll define the variables we're going to capture

            let json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};

            $('#main_table_countries_today > tbody:nth-child(2) > tr:nth-child(94)').filter(function(){
                //normalement nous sommes sur la ligne Ivory Coast
                // Let's store the data we filter into a variable so we can easily see what's going on.
    
                let data = $(this),
                children = data.children();
                children.each(function(i,elem){
                    switch(i){
                        case 0 : json.country = $(this).text().trim()
                        break;

                        case 1 : json.total_cases = $(this).text().trim()
                        break;

                        case 2 : json.new_cases = $(this).text().trim()
                        break;

                        case 3 : json.total_deaths = $(this).text().trim()
                        break;

                        case 4 : json.new_deaths = $(this).text().trim()
                        break;

                        case 5 : json.total_recovered = $(this).text().trim()
                        break;
                        
                    }
                })

                        
            })
            if(json.country == ""){
                //The json object is empty
                console.log("ivoryCoastInfo invoked empty");
                return res.status(200).json({'error': true,'error_msg':"Empty json object",'data':json});
            }else{
                //The json object is not empty
                console.log("ivoryCoastInfo invoked");
                return res.status(200).json({'error': false,'data':json});

            }
            
        }
    })
    await new Promise((resolve, reject) => setTimeout(resolve, 300));

}*/
  
}