// RACHIO PROJECT 

//Requires 
var express = require('express')
var bodyParser = require('body-parser')
var logger = require('morgan')
var https = require('https')

//Creating Express App
var app = express()

//App Configuration 
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(__dirname + '/public'))

const apiToken = 'c3667b81-92a6-4913-b83c-64cc713cbc1e'
// const apiPath = '/1/public'
// const userEndpoint = '/person/'

//Routes 
const baseURI = 'api.rach.io'
var rachioHeaders = {
		'Content-Type': 'application/json',
		'Authorization': 'Bearer ' + apiToken
	}

function fetchUserID(success) {
	var infoOptions = {
		host: baseURI,
		path: '/1/public/person/info',
		method: 'GET',
		headers: rachioHeaders
	}

	var infoReq = https.get(infoOptions, function(res) {
		console.log('STATUS: ' + JSON.stringify(res.statusCode))
		console.log('HEADERS: ' + JSON.stringify(res.headers))
	
		//Getting data and parsing it 
		res.on('data', function(data) {
			var jsonObject = JSON.parse(data)
			console.log('ID: ' + jsonObject.id)

			success(jsonObject)
		})
	})

	infoReq.end()
}

function fetchUser(ID, success) {
	var userOptions = {
			host: baseURI,
			path: '/1/public/person/' + ID,
			method: 'GET',
			headers: rachioHeaders
		}

	var responseString = ''
	var userReq = https.get(userOptions, function(userRes) {
		userRes.on('data', function(data) {
			responseString += data
		})

		userRes.on('end', function() {
			var userObject = JSON.parse(responseString)
			success(userObject)

			/*for(i=0; i < userObject.devices.length; i++){
				console.log("Device Zones: " + JSON.stringify(userObject.devices[i].zones))
			}*/ 
		})
	})

	userReq.end()
}

function requestStartZones(zoneIDs, duration, success) {
	//var path = (zoneIDs.length > 1)? 
	
}

function requestStartZone(zoneID, duration, success) {
	var zoneParams = {
		'id': zoneID,
		'duration': duration
	}
	var options = {
			host: baseURI,
			path: '/public/zone/start',
			method: 'PUT',
			headers: rachioHeaders
		}

	var req = https.request(options, function(res) {
		console.log('Request body:' + req.body)
		console.log('Zone start status: ' + JSON.stringify(res.statusCode))
		console.log('Zone start headers: ' + JSON.stringify(res.headers))

		success()
	})
	req.body = JSON.stringify(zoneParams)
	//req.write(JSON.stringify(zoneParams))
	req.end()
}

fetchUserID(function(idObject) {
	fetchUser(idObject.id, function(userObject) {
		console.log('User Object: ' + JSON.stringify(userObject, null, 2))
	})
})

requestStartZone('5e78b7b7-c0c6-48e4-aab0-2504d4633564', 60, function(res) {

})

//Constructor for user object 
function User(id, userName, fullName, devices) {
	this.id = id 
	this.userName = userName 
	this.fullName = fullName
	this.devices = devices
}

//Server 

var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port)
})