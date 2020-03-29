const URL = "https://www.worldometers.info/coronavirus/";
const {exec} = require("child_process");
let request = require("request"),cheerio = require('cheerio');

async function getCoronaIvoryCoastInfo(req,res){
    request(URL, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request

        if(!error){
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

        let $ = cheerio.load(html);

        // Finally, we'll define the variables we're going to capture

        let json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};

        $('#main_table_countries_today > tbody:nth-child(2) > tr:nth-child(95)').filter(function(){
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

    await new Promise((resolve, reject) => setTimeout(resolve, 50));

}
async function countriesList(req,res){
    request(URL, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request

        if(!error){
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

        let $ = cheerio.load(html);

        // Finally, we'll define the variables we're going to capture

        let countries = new Array();//json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};

        $('#main_table_countries_today > tbody:nth-child(2)').filter(function(){
            //We're going to put the cursor on the first line of the array
            // Let's store the data we filter into a variable so we can easily see what's going on.

            let data = $(this),tmp;
            children = data.children();
            children.each(function(i,elem){
               
                tmp = $(this).text().trim().split("\n");
                
                countries.push(tmp[0]);
                
            })
            
        })
        if(countries.length == 0){
            //The json object is empty
            console.log("countriesList invoked empty");
            return res.status(200).json({'error': true,'error_msg':"Empty json object",'data':countries});
        }else{
            //The json object is not empty
            console.log("countriesList invoked");
            return res.status(200).json({'error': false,'data':countries});

        }
        
        }else
            return res.status(500).json({'error':true,'error_msg':'Internal problem occured'})
})
}

//corona info about all of infected countries
 function countriesInfo(req, res){
   
    //We are returning all info about each country
    request(URL, function(error, response, html){
            // First we'll check to make sure no errors occurred when making the request
    
            if(!error){
            // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
    
            let $ = cheerio.load(html);
    
            // Finally, we'll define the variables we're going to capture
    
            let countries = new Array();//json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};
    
            $('#main_table_countries_today > tbody:nth-child(2)').filter(function(){
                //We're going to put the cursor on the first line of the array
                // Let's store the data we filter into a variable so we can easily see what's going on.
    
                let data = $(this),tmp;
                children = data.children();
                children.each(function(i,elem){
                   
                    let json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};
                    tmp = $(this).text().trim().split("\n");
                    json.country = tmp[0];
                    json.total_cases = tmp[1];
                    json.new_cases = tmp[2];
                    json.total_deaths = tmp[3];
                    json.new_deaths = tmp[4];
                    json.total_recovered = tmp[5];
                    countries.push(json);
                    
                })
                
            })
            if(countries.length == 0){
                //The json object is empty
                console.log("countriesList invoked empty");
                return res.status(200).json({'error': true,'error_msg':"Empty json object",'data':countries});
            }else{
                //The json object is not empty
                console.log("countriesList invoked");
                return res.status(200).json({'error': false,'data':countries});
    
            }
            
            }else
                return res.status(500).json({'error':true,'error_msg':'Internal problem occured'})
    })
    //await new Promise((resolve, reject) => setTimeout(resolve, 50));

}

async function countryInfo(req,res,countryToSearch){
    request(URL, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request

        if(!error){
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

        let $ = cheerio.load(html);

        // Finally, we'll define the variables we're going to capture

        let countries = new Array();//json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};

        $('#main_table_countries_today > tbody:nth-child(2)').filter(function(){
            //We're going to put the cursor on the first line of the array
            // Let's store the data we filter into a variable so we can easily see what's going on.

            let data = $(this),tmp;
            children = data.children();
            children.each(function(i,elem){
               
                tmp = $(this).text().trim().split("\n");
                if(countryToSearch.toLowerCase() == tmp[0].toLowerCase()){
                    let json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};
                    json.country = tmp[0];
                    json.total_cases = tmp[1];
                    json.new_cases = tmp[2];
                    json.total_deaths = tmp[3];
                    json.new_deaths = tmp[4];
                    json.total_recovered = tmp[5];

                    return res.status(200).json({'error':false,'data':json})
                }
                
            })
            
        })
        
        }else
            return res.status(500).json({'error':true,'error_msg':'Internal problem occured'})
    })
}
module.exports = {
    getCoronaIvoryCoastInfo,
    countriesInfo,
    countriesList,
    countryInfo
}