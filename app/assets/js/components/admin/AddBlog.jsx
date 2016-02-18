"use strict";
import React from 'react';
import ReactQuill from 'react-quill';

import AuthenticatedComponent from '../admin/AuthenticatedComponent.jsx';
import BlogStore from '../../stores/BlogStore';
import AuthAction from '../../actions/AuthAction';

export default AuthenticatedComponent(class AddBlog extends React.Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state = {
			title: null,
			author: null,
			content: null
		}
	}

	componentWillMount() { 
		BlogStore.addChangeListener(this.onChange);
  }

	componentDidMount() {
		this.setState({author: this.props.user.username})
	}

	componentWillUnmount() {
    BlogStore.removeChangeListener(this.onChange);
  }

  handleTitleChange(e) {
    this.setState({title: e.target.value});
  }
  
  handleContentChange(e) {
    this.setState({content: e});
  }

  handleSubmit(e) {
  	e.preventDefault();
  	// let id = this.props.params.id;
  	// if (id) { //editing
  	// 	PlayerServerActions.editPlayer(id, this.state);
  	// }else { //newplayer
  	// 	PlayerServerActions.addNewPlayer(this.state);
  	// }
		AuthAction.createBlogPost(this.state);

  	this.setState({
  		title: null,
  		content: null
  	});
  }

  onChange() {
  	let blog = BlogStore.getSingleblog();
  	this.setState({
  		title: blog.title,
  		author: blog.author,
  		content: blog.content
  	});
  }

  render() {
  	return (
	  	<div className="blog-creation-wrapper">
	  		<form className="blog-form" onSubmit={this.handleSubmit}>
	  			<div className="col-md-12">
						<div className="col-md-6 blog-title-label">
							<label className="label blog-title" htmlFor="title">Title</label>
							<input className="title-input" type="text" htmlFor="blog-title" name="title" value={this.state.title} onChange={this.handleTitleChange} required/>
						</div>
					</div>

					<div className="col-md-12 quill-container">
						<ReactQuill theme="snow" value={this.state.content} onChange={this.handleContentChange} />
					</div>

					<input className="btn btn-primary add-post" type="submit" htmlFor="submit-post" value="Submit Post" />
	  		</form>
	  	</div>
  	)
  }

})
