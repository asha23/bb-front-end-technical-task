import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";
import "../css/ListPosts.css";
import Header from './Header';
import Footer from './Footer';

export class ListPosts extends Component {
	_isMounted = false;
	constructor() {
		super();
		this.state = {
			allPosts: [],
			isLoading: false,
			error: null
		};
	}

	// GET THE POSTS

	componentWillMount() {
		this._isMounted = true;
		Axios.get("https://jsonplaceholder.typicode.com/posts")
		.then(result => {
			if (this._isMounted) {
				this.setState({
					allPosts: result.data,
					isLoading: false
				});
			}
		})
		.catch(error =>
			this.setState({
				error,
				isLoading: false
			})
		);
	}

	componentWillUnmount() {
		this._isMounted = false;
	}

	render() {
		return (
			<div>
				<Header />
				<div className="row ">
					
					{this.state.allPosts.map(item => (
					
						<article className="card col-md-6 " key={item.id}>
							<header className="card-header ">
								<h2>{item.title}</h2>
							</header>
							<div className="card-body">
								{item.body}
							</div>
							<div className="card-footer">
								<div className="row">
									<div className="col-sm">
										<span className="small">
											Post Id: {item.id} | User ID: {item.userId}
										</span>
									</div>
									<div className="col-sm text-right">
										<Link className="btn btn-warning" to={"/post/" + item.id}>
											More
										</Link>
									</div>
								</div>
							</div>
						</article>
						
					))}
					
				</div>
				<Footer />
			</div>
		);
	}
}

export default ListPosts;
