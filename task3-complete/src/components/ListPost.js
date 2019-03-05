import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import ListComments from "./ListComments";
import "../css/ListPost.css";
import Header from './Header';
import Footer from './Footer';

export default class ListPost extends Component {
	_isMounted = false;
	constructor() {
		super();
		this.state = {
			comments: [],
			singlePost: [],
			isLoading: false,
			error: ""
		};
		this.listComments = this.listComments.bind(this);
	}

	// GET THE POST BY ID

	componentWillMount() {
		this._isMounted = true;
		Axios.get(
			"https://jsonplaceholder.typicode.com/posts/" +
			this.props.match.params.postId
		)
		.then(result => {
			if (this._isMounted) {
				this.setState({
					singlePost: result.data,
					isLoading: false,
					error: "Loaded",
					postId: null
				});
			}
		})
		.catch(error =>
			this.setState({
				error: "Loading Error",
				isLoading: false
			})
		);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	// LIST THE COMMENTS BY postID in the URL
	// THIS FUNCTION IS CALLED IN THE RENDER - PROBABLY NOT THE BEST PLACE FOR IT

	listComments() {
		this._isMounted = true;
		Axios.get(
		"http://jsonplaceholder.typicode.com/posts/" +
			this.props.match.params.postId +
			"/comments?postId=" +
			this.props.match.params.postId
		)
		.then(result => {
			if (this._isMounted) {
				this.setState({
					comments: result.data,
					isLoading: false,
					postId: this.props.match.params.postId,
					error: "Loaded",
				});
			}
		})
		.catch(error =>
			this.setState({
				error: "Loading Error",
				isLoading: false
			})
		);
  	}

	render() {
		let singlePost = this.state.singlePost;

		return (
			<div>
				<Header />
				<div className="row">
					
					<article className="card">
						
						<header className="card-header">
							
							<div className="row">
								<div className="col-sm-10">
									<h2>{singlePost.title}</h2>
								</div>

								<div className="col-sm-2 text-right">
									<Link className="btn btn-warning" to={"/"}>
										Go back
									</Link>
								</div>
							</div>
						</header>
						<article className="card-body">
							{singlePost.body}
							<div className="comment-list">
								{this.listComments()}
								<ListComments
									comments={this.state.comments}
									postId={this.state.postId}
								/>
							</div>
						</article>
						<footer className="card-footer">
							<div className="row">
								<div className="col-sm">
									<span className="small">
										Post Id: {singlePost.id} | User ID: {singlePost.userId}
									</span>
								</div>
								<div className="col-sm text-right">
									<Link className="btn btn-warning" to={"/"}>
										Go back
									</Link>
								</div>
							</div>
						</footer>
					</article>
					
				</div>
				<Footer />
			</div>
		);
	}
}
