//var fs = require('fs'),
//    http = require('http');
//
//var express = require('express');
//var cors = require('cors');
//

var static = require('node-static');

//
// Create a node-static server instance to serve the './public' folder
//
var staticServer = new static.Server('roampage.json', {headers: {
                                                 'Access-Control-Allow-Origin': '*',
                                                 'Access-Control-Allow-Methods': 'GET',
                                                 'Access-Control-Allow-Headers': 'Content-Type'
                                               }});

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        //
        // Serve files!
        //
        staticServer.serve(request, response);
    }).resume();
}).listen(8080);


//var app = express()
//app.use(cors());
///* your regular routes go here */
//
//app.listen(3333, function () {
//  console.log('CORS-enabled web server listening on port 3333')
//})

//http.createServer(function (req, res) {
//  fs.readFile("roampage.json", function (err,data) {
//    if (err) {
//      res.writeHead(404);
//      res.end(JSON.stringify(err));
//      return;
//    }
//    res.writeHead(200);
//    res.end(data);
//  });
//}).listen(8080);