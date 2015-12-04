import React from 'react';
import PlayerStore from '../stores/PlayerStore';

import PlayerSearch from './playerSearch.jsx';

class MainPage extends React.Component {
	render() {
		// console.log('main page rendered');
		return (
			<div className="main-page-container">
				<PlayerSearch />
			</div>
		);
	}
}

module.exports = MainPage;