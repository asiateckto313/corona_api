const URL = "https://www.worldometers.info/coronavirus/";
const {exec} = require("child_process");
let request = require("request"),cheerio = require('cheerio');


async function countriesList(req,res){
    request(URL, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        console.log("error = ",error);

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
async function countriesInfo(req, res){
   
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
                console.log("countriesInfo invoked empty");
                return res.status(200).json({'error': true,'error_msg':"Empty json object",'data':countries});
            }else{
                //The json object is not empty
                console.log("countriesInfo invoked");
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
                        console.log("countryInfo invoked")
                        return res.status(200).json({'error':false,'data':json})
                    }
                    
                })
                if(tmp == undefined){
                    //Le pays entré ne se trouve pas dans la liste
                    console.log("countryInfo not found invoked")
                    return res.status(200).json({'error':false,'data':' country not found'})
                
                }
                
            })

            //return res.status(400).json({'error':true,'error_msg':'Bad Request'})
        
        }else{
            console.log("countryInfo error invoked")
            return res.status(500).json({'error':true,'error_msg':'Internal problem occured'})
        }
        

    })
}

async function countryInfo2(countryToSearch){
    let json_tmp;
    request(URL, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        if(error)
            console.error('error:', error); // Print the error if one occurred

        if(html){
            console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
            console.log('on a un body'); // Print the HTML for the Google homepage.

        }
            
    })
}

module.exports = {
    countriesInfo,
    countriesList,
    countryInfo,
    countryInfo2
}