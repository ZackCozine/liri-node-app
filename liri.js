require("dotenv").config();
var request = require("request");
var moment = require("moment");
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");

var operator = process.argv[2];
// used to declare spotify vs. OMDB etc.
var arg1 = process.argv[3];
// var arg2 = process.argv[4];
// first and second argument

if (operator === "spotify-this-song") {
    var Spotify = new Spotify(keys.spotify);

    Spotify.search({ type: 'track', query: arg1, limit: '1' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        };

        console.log("-------------------------");
        console.log("Artist Name: " + data.tracks.items[0].album.artists[0].name);
        console.log("Song Name: " + data.tracks.items[0].name);
        console.log("Song Preview URL: " + data.tracks.items[0].preview_url);
        console.log("Album: " + data.tracks.items[0].album.name);
        console.log("-------------------------");
    });
};
// everything related to spotify

if (operator === "movie-this") {
    request("http://www.omdbapi.com/?t=" + arg1 + "&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log("-------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Year Movie was Released: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("Rotten Tomato Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country Movie was Released in: " + JSON.parse(body).Country);
            console.log("Language Movie was Released in: " + JSON.parse(body).Language);
            console.log("Plot Summary: " + JSON.parse(body).Plot);
            console.log("Actors/Actresses: " + JSON.parse(body).Actors);
            console.log("-------------------------");
        };
    });

};
// everything related to OMDB

if (operator === "bands-in-town") {
    var URL = "https://rest.bandsintown.com/artists/" + arg1 + "/events?app_id=trilogy"
    request(URL, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var bBody = JSON.parse(body);
            console.log("-------------------------");
            console.log("Band: " + arg1);
            console.log("Venue: " + bBody[0].venue.name);
            console.log("State: " + bBody[0].venue.region);
            console.log("City: " + bBody[0].venue.city);
            console.log("-------------------------");
        };
    });
};
//bands in town api