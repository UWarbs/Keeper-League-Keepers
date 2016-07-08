import React from 'react';


class PaginationLinks extends React.Component {
	constructor() {
		super();
		this.next = this.next.bind(this);
		this.previous = this.previous.bind(this);
		super();
	}

	next() {
		this.props.handleNext();
	}

	previous() {
		this.props.handlePrevious();
	}

	render() {
		let previous;
		let offset = this.props.offset;

		let next = React.createElement('a', {className: 'next-players', onClick: this.next}, 'Next 10');
		if (offset == 0) {
			previous = null;
		}else {
			previous = React.createElement('a', {className: 'previous-players', onClick: this.previous}, 'Previous 10');
		}

		return (
			<div className="pagination-container">
				{previous}
				{next}
			</div>
		);
	}
}

module.exports = PaginationLinks;