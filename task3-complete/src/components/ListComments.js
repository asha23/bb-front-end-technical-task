import React, { Component } from "react";
import "../css/ListComments.css";

export default class ListComments extends Component {
	render() {
		return (
			<div className="comments">
				<header>
					<h2>Comments</h2>
				</header>
				{this.props.comments.map(item => (
					<article className="card" key={item.id}>

						<div className="card-header">
							<h5>{item.name}</h5>
							<p><strong><a href={"mailto:" + item.email}>{item.email}</a></strong></p>
						</div>

						<div className="card-body">
							{item.body}
						</div>

						<div className="card-footer">
							<span className="small">Post Id: {item.postId} | Comment ID: {item.id}</span>
						</div>
							
					</article>
				))}
			</div>
		);
	}
}
