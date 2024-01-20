import React, { Component } from "react";

export default class Loading extends Component {
	render() {
		return (
			<div className="spinner-border" role="status">
				<span className="sr-only"></span>
			</div>
		);
	}
}
