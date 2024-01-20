import React, { Component } from "react";
import { Link } from "react-router-dom";

import axios from "axios";

import books from "../../assets/images/books.jpeg";
import Loading from "../shared/Loading";
import getCookie from "../../utils/cookie/getCookie";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			completed_courses: [],
			loading: true,

			courses_applied: [],
			loading2: true,
		};

		this.getCompletedCourses = this.getCompletedCourses.bind(this);
		this.getAppliedCourses = this.getAppliedCourses.bind(this);
	}

	componentDidMount() {
		this.getCompletedCourses();
		this.getAppliedCourses();
	}

	getCompletedCourses() {
		const url = backend_url + "api/user/completed_courses";
		const form_data = {
			jwt: getCookie("jwt"),
		};

		const headers = {
			"Content-Type": "application/json",
			credentials: "include",
			withCredentials: true,
		};

		axios
			.post(url, form_data, headers)
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					if (response.data.status === 200) {
						this.setState({
							completed_courses: response.data.courses,
							loading: false,
						});
					} else {
						var error = new Error();
						error.status = response.data.status;
						error.message = response.data.message;
						throw error;
					}
				}
			})
			.catch((error) => {
				var error_message;
				try {
					error_message = error.response.data.message;
				} catch (e) {
					error_message = error.message;
				}

				this.setState({
					loading: false,
					courses: [],
				});

				console.error(error_message);
			});
	}

	getAppliedCourses() {
		const url = backend_url + "api/user/applied_courses";
		const form_data = {
			jwt: getCookie("jwt"),
		};

		const headers = {
			"Content-Type": "application/json",
			credentials: "include",
			withCredentials: true,
		};

		axios
			.post(url, form_data, headers)
			.then((response) => {
				console.log(response);
				if (response.status === 200) {
					if (response.data.status === 200) {
						this.setState({
							courses_applied: response.data.courses,
							loading2: false,
						});
					} else {
						var error = new Error();
						error.status = response.data.status;
						error.message = response.data.message;
						throw error;
					}
				}
			})
			.catch((error) => {
				var error_message;
				try {
					error_message = error.response.data.message;
				} catch (e) {
					error_message = error.message;
				}

				this.setState({
					loading2: false,
					courses: [],
				});

				console.error(error_message);
			});
	}

	render() {
		const { completed_courses, courses_applied, loading, loading2 } =
			this.state;
		return (
			<div>
				<div className="text-center">
					<h2>Courses completed</h2>
					<div className="row">
						{loading ? (
							<span className="text-center">
								<Loading />
							</span>
						) : (
							<>
								{completed_courses.length < 1 ? (
									<div className="text-center p-5">No courses available</div>
								) : null}
								{completed_courses.map((course) => (
									<span
										className="col-xs-12 col-md-4 my-3 px-3"
										key={course._id}
									>
										<div className="card">
											<img
												className="card-img-top"
												src={books}
												alt="Card image cap"
											/>
											<div className="card-body">
												<h5 className="card-title">{course.name}</h5>
												<p className="card-text">{course.description}</p>

												<Link
													className="nav-link btn btn-primary p-2"
													to={`/course/${course._id}`}
												>
													View course
												</Link>
											</div>
										</div>
									</span>
								))}
							</>
						)}
					</div>
				</div>

				<hr />

				<div className="text-center">
					<h2>Courses in progress</h2>
					<div className="row">
						{loading2 ? (
							<span className="text-center">
								<Loading />
							</span>
						) : (
							<>
								{courses_applied.length < 1 ? (
									<div className="text-center p-5">No courses available</div>
								) : null}
								{courses_applied.map((course) => (
									<span
										className="col-xs-12 col-md-4 my-3 px-3"
										key={course._id}
									>
										<div className="card">
											<img
												className="card-img-top"
												src={books}
												alt="Card image cap"
											/>
											<div className="card-body">
												<h5 className="card-title">{course.name}</h5>
												<p className="card-text">{course.description}</p>

												<Link
													className="nav-link btn btn-primary p-2"
													to={`/course/${course._id}`}
												>
													View course
												</Link>
											</div>
										</div>
									</span>
								))}
							</>
						)}
					</div>
				</div>
			</div>
		);
	}
}
