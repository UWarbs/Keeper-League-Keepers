// React components
var React         = require('react');

var RecordStore   = require('../stores/RecordStore');
var RecordActions = require('../actions/RecordActions');

// var LineChart = require('./lineChart.jsx');

var App = React.createClass({
	getInitialState: function() {
		// return RecordActions.getData();
		return null;
	},

	render: function() {
		console.log(this.state);
		return (
				<div>Hello</div>
		)
	}
});

React.render(<App />, document.getElementById('app-container') );

