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
var data="";

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(chunk) {
    data += chunk;
});

process.stdin.on('end', function() {
    console.log(data);
});




phantom.create([
    '--ignore-ssl-errors=yes',
    '--load-images=yes',
    '--local-to-remote-url-access=yes'
]).then(function(ph) {
    ph.createPage().then(function(page) {
        page.open('./GeoChart.html').then(function(status) {
            page.property('content').then(function(content) {
                setTimeout(function() {
                    page.render( __dirname + "/map.png");
                    page.close();
                    ph.exit();

                    var path = require("path");
                    console.log(JSON.stringify({
                        "type":"image",
                        "data":path.resolve(__dirname + "/map.png")
                    }));

                    process.exit();


                },3000);
            });
        });
    });
});



