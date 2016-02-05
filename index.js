var express = require('express');
// var bodyParser = require("body-parser");
// var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
// var urlencodedParser = bodyParser.urlencoded({extended: false});

app.get('/scrape', function(req, res){

	url = 'https://scholar.google.co.id/scholar?hl=en&q=mauridhi+hery&btnG=';

	request(url, function(error, response, html){
		if(!error){
			var $ = cheerio.load(html);

			var judul, link, penulis;
			var json = { judul : "", link : "", penulis : ""};
			var jdl = [],lnk = [], nscholar=[];
			
			$('h3.gs_rt').each(function(i, element){
				var a = $(this);
				// console.log(a.text());
				// console.log(a.find('a').attr('href'));
				jdl.push(a.text());
				lnk.push(a.find('a').attr('href'));
			});
			
			$('#gs_n').children().children().children().children().each(function(i, element){
				var a = $(this);
				var el = a.not($("[nowrap='']")).children().attr('href');
				if(el != undefined){
					// nscholar.push(el);
					console.log(el);
				}
				// console.log(a.find('td > a').attr('href'));
			});
			
			json.judul = jdl;
			json.link = lnk;
		}
		res.json(json);

	}) ;
});

var server = app.listen(8081,function(){
	var host = server.address().address;
	var port = server.address().port;
	
	console.log("Web Crawler Listening at http://%s:%s",host,port);
})