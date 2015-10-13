/**
 * Created by enahum on 12-10-15.
 */

var React = require('react'),
    ReactDOM = require('react-dom'),
    cookies = require('./cookies'),
    TweetsApp = require('./components/TweetApp.jsx'),
    Languages = require('./components/LanguageChange.jsx'),
    locale = navigator.language.split('-'),
    messages = require('./public/locales/*.json', {mode: 'hash'}),
    strings, initialState, intlData;
window.cookies = cookies;


locale = locale[1] ? `${locale[0]}-${locale[1].toUpperCase()}` : navigator.language;
locale = cookies.read("lang") || document.documentElement.getAttribute('lang') || locale;
strings = messages[locale] ? messages[locale] : messages['en-US'];
strings = Object.assign(messages['en-US'], strings);

// Snag the initial state that was passed from the server side
initialState = JSON.parse(document.getElementById('initial-state').innerHTML);

intlData = {
    locales : [locale],
    messages: strings
};

// Render the components, picking up where react left off on the server
ReactDOM.render(
    <TweetsApp tweets={initialState} {...intlData} />,
    document.getElementById('react-app')
);

var appLocales = [], key;
for(key in messages) {
    if(messages.hasOwnProperty(key)) {
        appLocales.push(key);
    }
}
ReactDOM.render(
  <Languages langs={appLocales} locale={locale} />,
    document.getElementById("language")
);