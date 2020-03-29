//Imports
let express = require("express"),
 coronaCtrler = require('./routes/coronaCtrler');

exports.router = (function(){

    var apiRouter = express.Router();

    // Differents corona routes that my api offers
    apiRouter.route("/corona/countriesList").get(coronaCtrler.countriesList);
    apiRouter.route("/corona/countryInfo").post(coronaCtrler.countriesList);
    apiRouter.route("/corona/ivoryCoastInfo/").get(coronaCtrler.ivoryCoastInfo);

    
    return apiRouter;
})();