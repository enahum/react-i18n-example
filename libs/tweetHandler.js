var db = require('../models');

module.exports = function(stream, io){

    stream.on('error', function(err){
       console.log(err);
    });
    // When tweets get sent our way ...
    stream.on('data', function(data) {

        // Construct a new tweet object
        var tweet = {
            twid: data['id'],
            active: false,
            author: data['user']['name'],
            avatar: data['user']['profile_image_url'],
            body: data['text'],
            date: data['created_at'],
            screenname: data['user']['screen_name'],
            entities: data['entities']
        };

        // Create a new model instance with our object
        var tweetEntry = new db.models.Tweet(tweet);

        //// Save 'er to the database
        tweetEntry.save(function(err) {
            if (!err) {
                // If everything is cool, socket.io emits the tweet.
                io.emit('tweet', tweet);
            }
        });

    });
};