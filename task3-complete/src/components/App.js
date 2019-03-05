import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router";
import "../css/App.css";
import ListPosts from "./ListPosts";
import ListPost from "./ListPost";

class App extends Component {
	render() {
		return (
			<div className="container">
				<Router>
					<Switch>
						<Route exact path="/" component={ListPosts} />
						<Route path="/post/:postId" component={ListPost} />
					</Switch>
				</Router>
			</div>
		);
	}
}

export default App;
