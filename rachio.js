// RACHIO PROJECT 
//https://api.rach.io/1/public/person/info
// API Token: c3667b81-92a6-4913-b83c-64cc713cbc1e

//Person ID: "61b28ce9-7bc1-47cc-9b85-98b6bebf8951"


var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var https = require('https')

var app = express()


app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

var baseURI = 'api.rach.io'

var options = {
	host: baseURI,
	path: '1/public/person/info',
	method: 'GET',
	headers: {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e'
	}
}

var req = https.get(options, function(res) {
	console.log('STATUS: ' + JSON.stringify(res.statusCode))
	console.log('HEADERS: ' + JSON.stringify(res.headers))
})
		

		/*app.get(baseURI + 'public/person/info')
		.setRequestHeader("Content_Type", "application/json")
		.setRequestHeader("Authorization", "Bearer c3667b81-92a6-4913-b83c-64cc713cbc1e")
		    .then(function(returnData){
		    	console.log(returnData)
		    })

		app.post(baseURI + 'public/device/stop_water', {id : deviceID})
		    .then(function(returnData){

		    })*/ 


var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})