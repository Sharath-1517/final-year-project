import React, { Component } from "react";

import Header from "../header";
import MyRoutes from "../../routes/my_routes";

export default class index extends Component {
	render() {
		return (
			<main className="container">
				<Header />
				<MyRoutes />
			</main>
		);
	}
}
