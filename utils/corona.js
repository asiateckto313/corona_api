const URL = "https://www.worldometers.info/coronavirus/",
    URL_CI = "https://www.covid19-ci.info",
    {exec} = require("child_process");
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

async function ivoryCoastInfo(req, res, countryToSearch){
    if(countryToSearch.toLowerCase() == "ivory coast" || countryToSearch.toLowerCase() == "cote d'ivoire" ||
    countryToSearch.toLowerCase() == "côte d'ivoire"){

        request(URL_CI, function(error, response, html){
            // First we'll check to make sure no errors occurred when making the request
            if(error)
                console.error('error:', error); // Print the error if one occurred
    
            if(html){
                console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                console.log('on a un body'); // Print the HTML for the Google homepage.
    
                // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
    
                let $ = cheerio.load(html),
    
                // Finally, we'll define the variables we're going to capture
     
                global_information = new Array(),
                region = new Array(), town = new Array();//json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};
                
                // Global informations 
                $('body > div.app-admin-wrap.layout-sidebar-large > div.main-content-wrap.sidenav-open.d-flex.flex-column > div > div:nth-child(3)').filter(function(){
                    //We're going to put the cursor on the first line of the array
                    // Let's store the data we filter into a variable so we can easily see what's going on.
                    let data = $(this),tmp,
                    children = data.children();
                    children.each(function(i,elem){
                        tmp = $(this).text().trim().split("\n")
                        if(i == 0)
                            global_information.push({
                                confirmed_cases_or_total_cases:tmp[2].trim().split(' ')[0],
                                new_cases : tmp[2].trim().split(' ')[2]  
                            })
                        if(i == 1)
                            global_information.push({
                                under_treatment:tmp[2].trim().split(' ')[0]
                            })
                        if(i == 2)
                            global_information.push({
                                healed:tmp[2].trim().split(' ')[0],
                                new_healed: tmp[2].trim().split(' ')[2]
                            })
                        if(i == 3){
                            global_information.push({
                                deaths:tmp[2].trim(),
                                new_deaths: tmp[2].trim().split(' ')[2]
                            })
                        
                        }
                        //Do not consider the 4th position after the return
                    })
                    
                    console.log("global_informations = ",global_information)
                })
    
                //Informations about the region (district)
                $('body > div > div.main-content-wrap.sidenav-open.d-flex.flex-column > div > div:nth-child(4) > div:nth-child(1) > div.ul-widget__body > ul').filter(function(){
                    //We're going to put the cursor on the first line of the array
                    // Let's store the data we filter into a variable so we can easily see what's going on.
                    let data = $(this),tmp,
                    children = data.children();
                    children.each(function(i,elem){
                        //we are going to store first informations about region
                        //region.pusj({name:'',infected_case_number:''})
                        if(i !==0 && i !== 18){
                            let tmp = $(this).text().trim().split('\n')[0].split(' ')
                            region.push({name:tmp[0],infected_case_number:tmp[1]})
                        }
                        else if (i == 0) console.log("i = ",i,"\telement = ",$(this).text().trim().split("\n")[0])
                        
                    })
                    //console.log("region = ",region)
    
                })
    
                //Informations about the cities (towns)
                $('body > div.app-admin-wrap.layout-sidebar-large > div.main-content-wrap.sidenav-open.d-flex.flex-column > div > div:nth-child(4) > div:nth-child(3) > div.ul-widget__body > ul').filter(function(){
                    //We're going to put the cursor on the first line of the array
                    // Let's store the data we filter into a variable so we can easily see what's going on.
                    let data = $(this),tmp,
                    children = data.children();
                    children.each(function(i,elem){
                        if(i !==24){
                            //we are going to store now informations about cities
                            let tmp = $(this).text().trim().split('\n')[0].split(' ')
                            town.push({name:tmp[0],infected_case_number:tmp[1]})
                        }
                    })
                    //console.log("towns = ",town)
    
                })
                
                console.log("ivoryCoastInfo invoked")
                return res.status(200).json({'global_info':global_information,'specific_info':{
                    'region':region,
                    'towns':town
                }})
    
            }
                
        })
    }
   
}

module.exports = {
    countriesInfo,
    countriesList,
    countryInfo,
    ivoryCoastInfo
}