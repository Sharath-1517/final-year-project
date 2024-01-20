import React, { Component } from "react";

import axios from "axios";

import { Link } from "react-router-dom";

//components
//shared
import Loading from "../shared/Loading";
import CourseComponent from "./CourseComponent";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			courses: [],
			loading: true,
		};

		this.getAllCourses = this.getAllCourses.bind(this);
	}

	componentDidMount() {
		this.getAllCourses();
	}

	getAllCourses() {
		const url = backend_url + "api/course";
		axios
			.get(url)
			.then(async (response) => {
				if (response.status === 200) {
					if (response.data.status === 200) {
						this.setState({
							courses: response.data.courses,
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
			.catch(async (error) => {
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

	render() {
		const { courses, loading } = this.state;
		console.log(courses);
		return (
			<div className="text-center">
				<h1 className="text-center">Courses</h1>
				{loading ? (
					<span className="text-center">
						<Loading />
					</span>
				) : (
					<>
						<div className="row">
							{courses.map((course) => (
								<span className="col-xs-12 col-md-4 my-3 px-3" key={course._id}>
									<CourseComponent course={course} />
								</span>
							))}
						</div>
					</>
				)}
			</div>
		);
	}
}
