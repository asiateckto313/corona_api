const URL = "https://www.worldometers.info/coronavirus/",
    URL_CI = "https://www.covid19-ci.info",
    {exec} = require("child_process"); // 
let request = require("request"),cheerio = require('cheerio'),
load_page =  function get(URL){
    return new Promise(function(resolve,reject){
        request(URL,function(error,response,html){
            if(!error){
                let loaded_page = cheerio.load(html)
                resolve(loaded_page)
            }
            else
                reject(error)
        })
    })
}, 
globalInfo =  async function(URL){
    let loaded_page = await load_page(URL), global_information = new Array(),
    region = await info_about_region(URL), town = await info_about_cities(URL),
    json_object={confirmed_cases_or_total_cases:'',
                new_cases:'+',
                under_treatment:'',
                healed:'',
                new_healed:'+',
                deaths:'',
                new_deaths:'+',
                'region':region,
                'town':town
    };

    // Global informations 
    return new Promise(function(resolve,reject){
        if(loaded_page){
            loaded_page('body > div.app-admin-wrap.layout-sidebar-large > div.main-content-wrap.sidenav-open.d-flex.flex-column > div > div:nth-child(3)').filter(function(){
            //We're going to put the cursor on the first line of the array
            // Let's store the data we filter into a variable so we can easily see what's going on.
            let data = loaded_page(this),tmp,
            children = data.children();
            children.each(function(i,elem){
                tmp = loaded_page(this).text().trim().split("\n")
                if(i == 0){
                    json_object.confirmed_cases_or_total_cases += tmp[2].trim().split(' ')[0]
                    json_object.new_cases += tmp[2].trim().split(' ')[2]  
                }
                if(i == 1)
                    json_object.under_treatment += tmp[2].trim().split(' ')[0]
                
                if(i == 2){
                        json_object.healed += tmp[2].trim().split(' ')[0]
                        json_object.new_healed += tmp[2].trim().split(' ')[2]
                    }
                if(i == 3){
                        json_object.deaths += tmp[2].trim().split(' ')[0]
                        json_object.new_deaths += tmp[2].trim().split(' ')[4]
                }
                    return false;
                
                //Do not consider the 4th position after the return
            })
            resolve(json_object)
            })
        }else
            reject("Error")
    })
// })
},
info_about_region = async function(URL){
    let loaded_page = await load_page(URL), region = new Array();
    if(loaded_page){
        return new Promise(function(resolve, reject){
            //Informations about the region (district)
            loaded_page('body > div > div.main-content-wrap.sidenav-open.d-flex.flex-column > div > div:nth-child(4) > div:nth-child(1) > div.ul-widget__body > ul').filter(function(){
                //We're going to put the cursor on the first line of the array
                // Let's store the data we filter into a variable so we can easily see what's going on.
                let data = loaded_page(this),tmp,
                children = data.children();
                children.each(function(i,elem){
                    let tmp = loaded_page(this).text().trim().split('\n')[0].split(' ')
                    //we are going to store first informations about region
                    //region.pusj({name:'',infected_case_number:''})
                    console.log("i = ",i,"\telem = ",tmp)
                    if(i !== 0 && i !== 6 && i !== 13 && i !== 17 && i !== 18){
                        region.push({name:tmp[0],infected_case_number:tmp[1]})

                    }else{
                        if (i == 0 || i == 17){ //District Autonome D'abijan index
                            let tempo='';
                            for(let j = 0; j< tmp.length-1; j++)
                                tempo += tmp[j]+' ';
                            region.push({name:tempo.trim(),infected_case_number:tmp[tmp.length-1]})
                        }
                        if (i == 13 || i == 6) //San Pedro index 
                            region.push({name:tmp[0]+' '+tmp[1],infected_case_number: tmp[2] })
                    }             
                })
                if(region.length >=0)
                    resolve(region)
                else
                    reject("Error, empty array")
                console.log("info_about_region invoked")

            })

        })
    }
}, 
info_about_cities = async function(URL){
    let loaded_page = await load_page(URL), town = new Array();
    if(loaded_page){
        return new Promise(function(resolve, reject){
            //Informations about the cities (towns)
            loaded_page('body > div.app-admin-wrap.layout-sidebar-large > div.main-content-wrap.sidenav-open.d-flex.flex-column > div > div:nth-child(4) > div:nth-child(3) > div.ul-widget__body > ul').filter(function(){
                //We're going to put the cursor on the first line of the array
                // Let's store the data we filter into a variable so we can easily see what's going on.
                let data = loaded_page(this),tmp,
                children = data.children();
                children.each(function(i,elem){
                    if(i !==24){
                        //we are going to store now informations about cities
                        let tmp = loaded_page(this).text().trim().split('\n')[0].split(' ')
                        town.push({name:tmp[0],infected_case_number:tmp[1]})
                    }
                })
                //console.log("towns = ",town)

            })
        })
    }
};


async function countriesList(req,res){
    request(URL, function(error, response, html){
        // First we'll check to make sure no errors occurred when making the request
        console.log("error = ",error);

        if(!error){
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality

        let loaded_page = cheerio.load(html);

        // Finally, we'll define the variables we're going to capture

        let countries = new Array();//json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};

        loaded_page('#main_table_countries_today > tbody:nth-child(2)').filter(function(){
            //We're going to put the cursor on the first line of the array
            // Let's store the data we filter into a variable so we can easily see what's going on.

            let data = loaded_page(this),tmp;
            children = data.children();
            children.each(function(i,elem){
               
                tmp = loaded_page(this).text().trim().split("\n");
                
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
    //TODO review the logic used here
    let countries = new Array();//json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};
    try {
        let loaded_page = await load_page(URL)
        loaded_page('#main_table_countries_today > tbody:nth-child(2)').filter(function(){
            //We're going to put the cursor on the first line of the array
            // Let's store the data we filter into a variable so we can easily see what's going on.

            let data = loaded_page(this),tmp;
            children = data.children();
            children.each(function(i,elem){
               
                let json = {country:"", total_cases:"", new_cases:"", total_deaths:"",	new_deaths:"",	total_recovered:""};
                tmp = loaded_page(this).text().trim().split("\n");
                console.log("tmp = ",tmp)
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

    } catch (e) {
        return res.status(500).json({'error':true,'error_msg':e})
    }
   
    //We are returning all info about each country
}

async function countryInfo(req,res,countryToSearch){
    try{
        let loaded_page = await load_page(URL)
        loaded_page('#main_table_countries_today > tbody:nth-child(2)').filter(function(){
            //We're going to put the cursor on the first line of the array
            // Let's store the data we filter into a variable so we can easily see what's going on.

            let data = loaded_page(this),tmp;
            children = data.children();
            children.each(function(i,elem){
            
                tmp = loaded_page(this).text().trim().split("\n");
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
    }catch(e){
        console.log("countryInfo error invoked")
        return res.status(500).json({'error':true,'error_msg':e})
    }
}

async function ivoryCoastInfo(req, res, typeOfInfo,countryToSearch){
    let json_object;
    if(countryToSearch.toLowerCase() == "ivory coast" || countryToSearch.toLowerCase() == "cote d'ivoire" ||
    countryToSearch.toLowerCase() == "côte d'ivoire"){
        if(typeOfInfo !== undefined && typeOfInfo.toLowerCase() == "global")
            json_object = await globalInfo(URL_CI)
        else if(typeOfInfo !== undefined && (typeOfInfo.toLowerCase() == "region" || typeOfInfo.toLowerCase() == "région" || typeOfInfo.toLowerCase() == "district") )
            json_object = await info_about_region(URL_CI)
        else if (typeOfInfo !== undefined && typeOfInfo.toLowerCase() == "cities" )
            json_object = await info_about_cities(URL_CI)
        console.log("/api/corona/ivoryCoastInfo invoked")
        return res.status(200).json({'error':false,typeOfInfo:json_object})
    }
   
}

module.exports = {
    countriesInfo,
    countriesList,
    countryInfo,
    ivoryCoastInfo
}