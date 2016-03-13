/**
 * Created by Maria on 3/12/2016.
 */

var url = "./GeoChart.html";

//var page = require('webpage').create();
//page.open(url, function(status) {
//    if(status !== 'success'){
//        console.log("Unable to load the adress");
//        phantom.exit(1);
//    }
//    else {
//        setTimeout(function() {
//            page.render('map.png');
//            phantom.exit();}, 5000)
//    }
//});


var phantom = require('phantom');

phantom.create().then(function(ph) {
    ph.createPage().then(function(page) {
        page.open(url).then(function(status) {
            console.log(status);
            page.property('content').then(function(content) {
                console.log(content);
                page.render('map.png');
                page.close();
                ph.exit();
            });
        });
    });
});