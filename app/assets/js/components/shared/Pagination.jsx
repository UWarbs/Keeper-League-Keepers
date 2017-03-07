import React from 'react';


class PaginationLinks extends React.Component {
	//Coming back to this after 8 months not sure why super called twice. hmm
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
		let listOver = this.props.listOver;
		let nextMin = ((offset + 1) * 10) + 1;
		let nextMax = ((offset + 1) * 10) + 10;
		let nextText = 'Next 10 (' + nextMin + '-' + nextMax + ')';

		let currentMin = (offset * 10) + 1;
		let currentMax = (offset * 10) + 10;

		let prevMin = ((offset - 1) * 10) + 1;
		let prevMax = ((offset - 1) * 10) + 10;
		let prevText = 'Previous 10 (' + prevMin + '-' + prevMax + ')';

		let next = React.createElement('a', {className: 'next', onClick: this.next}, nextText);
		if (offset == 0) {
			previous = null;
		}
		else {
			previous = React.createElement('a', {className: 'previous', onClick: this.previous}, prevText);
		}

		if(listOver){
			next = null;
		}

		return (

			<div className="pagination-container">
				<h4 className="current-range">{currentMin} - {currentMax}</h4>
				{previous}
				{next}
			</div>
		);
	}
}

module.exports = PaginationLinks;