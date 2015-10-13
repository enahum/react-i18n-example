/**
 * Created by enahum on 12-10-15.
 */

require('node-jsx-babel').install({extension: '.jsx'});
var db = require('../models'),
    React = require('react'),
    ReactDOMServer = require('react-dom/server'),
    messages = require('../locales'),
    utils = require('../libs/utils')(),
    TweetsApp = React.createFactory(require('../components/TweetApp.jsx')),
    controller = {};

controller.index = function(req, res, next) {
    var appLocales = [], key, locale, strings, intlData;
    for(key in messages) {
        if(messages.hasOwnProperty(key)) {
            appLocales.push(key);
        }
    }

    locale = req.cookies.lang || req.acceptsLanguages(appLocales) || 'en-US';
    strings = messages[locale] ? messages[locale] : messages['en-US'];
    strings = Object.assign(messages['en-US'], strings);

    intlData = {
        locales : [locale],
        messages: strings
    };

    db.models.Tweet.getTweets(0, 0, function(tweets){
        var markup = ReactDOMServer.renderToString(
            TweetsApp(utils.extend({
                tweets: tweets
            }, intlData))
        );

        res.render('index', {
            markup: markup, // Pass rendered react markup
            state: JSON.stringify(tweets) // Pass current state to client side
        });
    });
};

controller.page = function(req, res) {
    Tweet.getTweets(req.params.page, req.params.skip, function(tweets) {
        res.json(tweets);
    });
};

module.exports = controller;