/**
 * Created by enahum on 12-10-15.
 */
var Twitter = require('twitter'),
    config = require('./config'),
    io = require('../socketServer')(),
    handler = require('./tweetHandler');


var twitter = new Twitter(config.get("twitter"));

twitter.stream('statuses/filter',{ track: 'javascript'}, function(stream){
    handler(stream,io);
});