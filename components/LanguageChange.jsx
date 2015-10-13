/**
 * Created by enahum on 12-10-15.
 */

var React = require('react'),
    ReactIntl = require('react-intl'),
    cookies = require('../cookies'),
    IntlMixin = ReactIntl.IntlMixin;

// Export the TweetsApp component
module.exports = React.createClass({
    // Method to show the unread tweets
    changeLang: function(event){

        cookies.create("lang", event.currentTarget.value, 0);
        window.location.reload(true);
    },

    // Set the initial component state
    getInitialState: function(props){

        props = props || this.props;

        // Set initial application state using props
        return {
            langs: props.langs,
            selected: props.locale
        };

    },

    render: function(){
        var props = this.props;
        var opts = props.langs.map(function(lang) {
            return (
                <option key={lang} value={lang} selected={props.locale === lang}>{lang}</option>
            )
        });

        return (
            <select id="lang" onChange={this.changeLang}>{opts}</select>
        )

    }

});