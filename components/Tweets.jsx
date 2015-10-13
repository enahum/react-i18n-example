/**
 * Created by enahum on 12-10-15.
 */

var React = require('react'),
    Tweet = require('./Tweet.jsx');

module.exports = React.createClass({

    // Render our tweets
    render: function(){

        // Build list items of single tweet components using map
        var content = this.props.tweets.map(function(tweet){
            return (
                <Tweet key={tweet.twid} tweet={tweet} />
            )
        });

        // Return ul filled with our mapped tweets
        return (
            <ul className="tweets">{content}</ul>
        )

    }

});