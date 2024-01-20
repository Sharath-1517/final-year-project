import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";
import books from "../../assets/images/books.jpeg";

import MyButton from "../shared/MyButton";
import getCookie from "../../utils/cookie/getCookie";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default class CourseComponent extends Component {
	constructor(props) {
		super(props);

		this.state = {
			registered: false,
			registering: false,
			error_message: null,

			completed: false,
			completing: false,
			complete_error_message: null,
		};
		this.registerCourse = this.registerCourse.bind(this);
	}

	registerCourse(course_id) {
		this.setState({
			registering: true,
		});
		const form_data = {
			course_id: course_id,
			jwt: getCookie("jwt"),
		};
		const url = backend_url + "api/user/register_course";

		const headers = {
			"Content-Type": "application/json",
			credentials: "include",
			withCredentials: true,
		};

		axios
			.post(url, form_data, headers)
			.then((response) => {
				if (response.status === 200) {
					if (response.data.status === 200) {
						console.log(response);
						this.setState({
							registered: true,
							registering: false,
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
				console.error(error);

				var error_message;
				try {
					error_message = error.response.data.message;
				} catch (e) {
					error_message = error.message;
				}

				this.setState({
					registering: false,
					registered: false,
					error_message: error_message,
				});
			});
	}

	markAsCompleted(course_id) {
		this.setState({
			completing: true,
		});
		const form_data = {
			course_id: course_id,
			jwt: getCookie("jwt"),
		};
		const url = backend_url + "api/user/mark_course_completed";

		const headers = {
			"Content-Type": "application/json",
			credentials: "include",
			withCredentials: true,
		};

		axios
			.post(url, form_data, headers)
			.then((response) => {
				if (response.status === 200) {
					if (response.data.status === 200) {
						console.log(response);
						this.setState({
							completed: true,
							completing: false,
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
				console.error(error);

				var error_message;
				try {
					error_message = error.response.data.message;
				} catch (e) {
					error_message = error.message;
				}

				this.setState({
					completing: false,
					completed: false,
					complete_error_message: error_message,
				});
			});
	}

	render() {
		const { course } = this.props;
		const {
			registering,
			registered,
			error_message,
			completed,
			completing,
			complete_error_message,
		} = this.state;
		return (
			<div className="card">
				<img className="card-img-top" src={books} alt="Card image cap" />
				<div className="card-body">
					<h5 className="card-title">{course.name}</h5>
					<p className="card-text">{course.description}</p>

					<Link
						className="nav-link btn btn-primary p-2"
						to={`/course/${course._id}`}
					>
						View course
					</Link>

					<div className="row">
						<div className="col-xs-6 col-md-6 py-1">
							<MyButton
								text={
									registering
										? "registering..."
										: registered
										? "registered"
										: "register"
								}
								disabled={registered ? true : false}
								onClick={() => this.registerCourse(course._id)}
								className="btn btn-primary p-2 my-full-width "
							/>
						</div>
						<div className="col-xs-6 col-md-6 py-1">
							<MyButton
								text={
									completing
										? "Marking as completed..."
										: completed
										? "Completed"
										: "Mark as completed"
								}
								disabled={completed ? true : false}
								onClick={() => this.markAsCompleted(course._id)}
								className="btn btn-primary p-2 my-full-width "
							/>
						</div>
					</div>

					<div className="error-div text-center">{error_message}</div>
					<div className="error-div text-center">{complete_error_message}</div>
				</div>
			</div>
		);
	}
}
