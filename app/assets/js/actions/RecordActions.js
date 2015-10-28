var AppDispatcher = require('../dispatcher/AppDispatcher');
var Constants     = require('../constants/Constants');
var DataScraper   = require('../utils/DataScraper');

module.exports = {
	getData: function() {
		AppDispatcher.handleServerAction({
			actionType: Constants.GET_SCRAPED_DATA
		});
		DataScraper.getGoogle();
	}
};