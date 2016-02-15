"use strict";
import React from 'react';
import { Link }  from 'react-router'; //for editing link to blog-edit/:id etc


class BlogPost extends React.Component {
	constructor() {
		super();
		this.parseHtml = this.parseHtml.bind(this);
	}

  parseHtml() {
  	return {__html: this.props.blog.contents};
  }

	render() {

		return (
			<section className="blog-post-container">
				<BlogTitle />
				<BlogContent />
			</section>
    )
	}
}
//Blog Post Proptypes
// BlogPost.propTypes = {
// 	title: React.PropTypes.String,
// 	author: React.Proptypes.String,
// 	date: React.PropTypes.String,
// 	content: React.PropTypes.String
// };

module.exports = BlogPost;

class BlogTitle extends React.Component {
	render() {
		let title = this.props.title || 'test';
		let author = this.props.author || 'john smith';
		let date = this.props.date || 'Feb 23, 1991';
		return (
			<div className="blog-title-container">
				<h1 className="blog-title">{title}</h1>
				<span className="blog-author">{author}</span>
				<span className="blog-date">{date}</span>
			</div>
		)
	}
}

class BlogContent extends React.Component {
	render() {
		let content = this.props.content || 'Blah blah blah blah blah blah blah';
		return (
			<section className="blog-content-container">
				<div className="blog-content">{content}</div>
			</section>
		)
	}
}


class Blog extends React.Component {
	constructor() {
		super()
		this.state = {
			blogs: null  //rather not start null, maybe load top 5?
		}
	}

	//on load - foreach blog in blogs create new <BlogPost author={} date={} title={} content={} />

	render() {
		//let blogsToLoad = []
		// {blogs}
	}
}


/*
Blog
	Title/author/date
	contents
	comments
*/