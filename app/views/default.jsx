// Default layout template
var React = require('react');

var Default = React.createClass({

  render: function() {

    return(
      <html>
	      <head>

	        <meta charSet="utf-8"></meta>
	        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"></meta>
	        <title>Fantasy Keepers</title>
	        <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css" rel="stylesheet"></link>
	        <link href='https://fonts.googleapis.com/css?family=Varela+Round' rel='stylesheet' type='text/css'></link>
	        <script src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.6/d3.min.js"></script>
	        <script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
	      </head>
	      <body>
	        <div id="app-container"></div>
	        <script src="http://keeper-league.s3-website-us-west-2.amazonaws.com/js/bundle.js"></script>
	      </body>
      </html>
    );
  }
});

module.exports = Default;