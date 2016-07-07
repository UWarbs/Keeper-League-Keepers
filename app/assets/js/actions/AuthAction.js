'use strict';

import Api from '../ApiEndpoints';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Constants from '../constants/Constants';

export default {
	createUser: (jwt) => {
		//save JWT in localstorage
		localStorage.setItem('jwt', jwt);
		//dispatch action to all stores
		AppDispatcher.handleServerAction({
			actionType: Constants.CREATE_USER,
			jwt: jwt
		});
	},

	loginUser: (jwt) => {
		//save JWT in localstorage
		localStorage.setItem('jwt', jwt);
		//dispatch action to all stores
		AppDispatcher.handleServerAction({
			actionType: Constants.LOGIN_USER,
			jwt: jwt
		});
	},

	logoutUser: () => {
		localStorage.removeItem('jwt');
		AppDispatcher.handleServerAction({
			actionType: Constants.LOGOUT_USER
		})
	},

	//TODO: Maybe setting actionTypes that never are used in the store's switch case would be a good time to clear the page and display a sucess message, because all the error checks have passed
	createBlogPost: (content) => {
		Api.post('/api/new-blog', content)
		.then(function(content) {
			AppDispatcher.handleServerAction({
				actionType: Constants.NEW_BLOG,
				content: content
			});
		});
	},

	getSingleBlogPost: (id) => {
		Api.getSingleBlogPost('/api/blog/' + id)
		.then(function(blog) {
			AppDispatcher.handleServerAction({
				actionType: Constants.GET_SINGLE_BLOG,
				blog: blog
			});			
		})
	},

	editBlogPost: (id, content) => {
		Api.post('/api/edit-blog/' + id, content)
		.then(function(blog) {
			AppDispatcher.handleServerAction({
				actionType: Constants.EDIT_BLOG,
				blog: blog
			});
		});		
	},

	getAllBlogPosts: () => {
		Api.get('/api/all-blogs')
		.then(function(blogs) {
			AppDispatcher.handleServerAction({
				actionType: Constants.GET_ALL_BLOGS,
				blogs: blogs
			});
		});
	}
}