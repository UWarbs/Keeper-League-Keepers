"use strict";
import React from 'react';
import ReactQuill from 'react-quill';

import AuthenticatedComponent from '../admin/AuthenticatedComponent.jsx';
import BlogStore from '../../stores/BlogStore';

export default AuthenticatedComponent(class AddBlog extends React.Component {
	constructor() {
		super();
		this.onChange = this.onChange.bind(this);
		this.handleTitleChange = this.handleTitleChange.bind(this);
		this.handleContentChange = this.handleContentChange.bind(this);
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

	}

	componentWillUnmount() {
    BlogStore.removeChangeListener(this.onChange);
  }

  handleTitleChange(e) {
    this.setState({firstName: e.target.value});
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
  		author: null,
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
  	<div className="form-container">
  		<form className="blog-form">
  			<div className="col-md-12">
					<div className="col-md-6">
						<label className="label" htmlFor="title">Title</label>
						<input type="text" htmlFor="blog-title" name="title" value={this.state.title} onChange={this.handleTitleChange} required/>
					</div>
				</div>

				<div className="col-md-12 quill-container">
					<ReactQuill theme="snow" value={this.state.content} onChange={this.handleContentChange} />
				</div>
  		</form>
  	</div>
  }

})
