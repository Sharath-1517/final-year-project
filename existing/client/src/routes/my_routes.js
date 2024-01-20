import React, { Component } from "react";
import { Routes, Route } from "react-router-dom";

//import route type
import RestrictedRoute from "./types/RestrictedRoute";
import PrivateRoute from "./types/PrivateRoute";

//import component
import HomeComponent from "../components/home/index";
import LoginComponent from "../components/login";
import RegisterComponent from "../components/register";

import CourseComponent from "../components/course";
import MyCourseComponent from "../components/my_courses";

export default class MyRoutes extends Component {
	render() {
		return (
			<>
				<Routes location={this.props.location}>
					{/* Restricted route ends here here */}
					<Route path="/login" element={<RestrictedRoute />}>
						<Route path="/login" element={<LoginComponent />} />
					</Route>
					<Route path="/register" element={<RestrictedRoute />}>
						<Route path="/register" element={<RegisterComponent />} />
					</Route>

					{/*  Private route */}
					<Route exact path="/course/:id" element={<PrivateRoute />}>
						<Route exact path="/course/:id" element={<CourseComponent />} />
					</Route>

					<Route exact path="/my_courses" element={<PrivateRoute />}>
						<Route exact path="/my_courses" element={<MyCourseComponent />} />
					</Route>

					<Route exact path="/" element={<PrivateRoute />}>
						<Route exact path="/" element={<HomeComponent />} />
					</Route>
				</Routes>
			</>
		);
	}
}
