"use strict";
import React from 'react';
import { Link }  from 'react-router'; //for editing link to blog-edit/:id etc
import BlogStore from '../stores/BlogStore';
import AuthAction from '../actions/AuthAction';


class BlogPost extends React.Component {
	render() {
		return (
			<section className="blog-post-container col-md-12">
				<BlogTitle id={this.props.id} title={this.props.title} author={this.props.author} date={this.props.date}/>
				<BlogContent content={this.props.content} />
			</section>
    )
	}
}

//Blog Post Proptypes
BlogPost.propTypes = {
	title: React.PropTypes.string,
	author: React.PropTypes.string,
	date: React.PropTypes.string,
	content: React.PropTypes.string,
	id: React.PropTypes.number
};


class BlogTitle extends React.Component {
	render() {
		let title = this.props.title || 'test';
		let author = this.props.author || 'john smith';
		let date = this.props.date || 'Feb 23, 1991';
		let id = this.props.id;
		console.log(this.props);
		return (
			<div className="blog-title-container">
				<span className="blog-edit"><Link to={ `/admin/edit-blog/${id}` }>EDIT POST</Link></span>
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
		AuthAction.getAllBlogPosts();
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
		let blogList = [];
		
		if(blogs) {
			blogs.forEach(function(blog, index, array) {
				let formatDate = new Date(blog.created_at);
				let day = formatDate.getDate();
				let month = formatDate.getMonth() + 1;
				let year = formatDate.getFullYear();
				let finalDate = month + '-' + day + '-' + year;
				blogList.push(<BlogPost key={blog.id} id={blog.id} title={blog.title} author={blog.author} date={finalDate} content={blog.content} />);
			});			
		}


		return (
			<div className="blog-page-wrapper">
				<h2 className="page-header">KLK BLOG</h2>
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