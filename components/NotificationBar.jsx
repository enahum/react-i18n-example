/**
 * Created by enahum on 12-10-15.
 */

var React = require('react'),
    ReactIntl = require('react-intl'),
    IntlMixin = ReactIntl.IntlMixin,
    FormattedMessage = ReactIntl.FormattedMessage;

module.exports = React.createClass({
    mixins: [IntlMixin],
    render: function(){
        var count = this.props.count;
        return (
            <div className={"notification-bar" + (count > 0 ? ' active' : '')}>
                <p>
                    <FormattedMessage
                        message={this.getIntlMessage('notification_bar.new_tweets')}
                        count={count} />
                    <a href="#top" onClick={this.props.onShowNewTweets}>
                        <FormattedMessage
                        message={this.getIntlMessage('notification_bar.view_tweets')}
                        count={count} /></a></p>
            </div>
        )
    }
});