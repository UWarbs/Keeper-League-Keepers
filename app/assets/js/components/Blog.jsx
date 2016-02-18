"use strict";
import React from 'react';
import { Link }  from 'react-router'; //for editing link to blog-edit/:id etc
import BlogStore from '../stores/BlogStore';
import PlayerServerActions from '../actions/PlayerServerActions';


class BlogPost extends React.Component {
	render() {
		return (
			<section className="blog-post-container">
				<BlogTitle title={this.props.title} author={this.props.author} date={this.props.date}/>
				<BlogContent content={this.props.content} />
			</section>
    )
	}
}

//Blog Post Proptypes
BlogPost.propTypes = {
	title: React.PropTypes.String,
	author: React.PropTypes.String,
	date: React.PropTypes.String,
	content: React.PropTypes.String
};


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
	constructor() {
		super();
		this.parseHtml = this.parseHtml.bind(this);
	}
  
  parseHtml() {
  	return {__html: this.props.content};
  }

	render() {
		return (
			<section className="blog-content-container">
				<div className="blog-content" dangerouslySetInnerHTML={this.parseHtml()}></div>
			</section>
		)
	}
}


class Blog extends React.Component {
	constructor() {
		super()
		this.onChange = this.onChange.bind(this);
		this.state = {
			blogs: null  
		}
	}

	componentWillMount() {
    BlogStore.addChangeListener(this.onChange);
  }

	componentDidMount() {
		PlayerServerActions.getAllBlogPosts();
	}

	componentWillUnmount() {
    BlogStore.removeChangeListener(this.onChange);
  }

  onChange() {
		this.setState({
	  	blogs: BlogStore.getAllPosts()
	  });  		
  }

	//on load - foreach blog in blogs create new <BlogPost author={} date={} title={} content={} />

	render() {
		let blogs = this.state.blogs || null;
		console.log('blog render');
		console.log(blogs);
		let blogList = [];
		
		if(blogs) {
			blogs.forEach(function(blog, index, array) {
				blogList.push(<BlogPost key={blog.id} title={blog.title} author={blog.author} date={blog.created_at} content={blog.content} />);
			});			
		}


		return (
			<div className="blog-page-wrapper">
				{blogList}
			</div>
		)
	}
}

module.exports = Blog;

/*
Blog
	Title/author/date
	contents
	comments
*/