import React, { Component } from "react";
import { Link, Navigate } from "react-router-dom";

import axios from "axios";

//import components
import MyButton from "../shared/MyButton";
import Loading from "../shared/Loading";
import LoginIcon from "../shared/icons/LoginIcon";

//utils
import isLoggedIn from "../../utils/isLoggedIn";

const backend_url = process.env.REACT_APP_BACKEND_URL;

export default class index extends Component {
	constructor(props) {
		super(props);

		this.state = {
			loading: false,
			message: null,
			error_message: null,
			loggedIn: isLoggedIn(),
		};

		this.submitForm = this.submitForm.bind(this);
		this.loginAction = this.loginAction.bind(this);
	}

	loginAction(form_data) {
		const url = backend_url + "api/user/login";

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
							message: response.data.message,
							loading: false,
							loggedIn: true,
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
				console.error("Unable to login");
				console.error(error);

				var error_message;
				try {
					error_message = error.response.data.message;
				} catch (e) {
					error_message = error.message;
				}

				this.setState({
					loading: false,
					error_message: error_message,
					message: null,
				});
			});

		//return false;
	}

	submitForm() {
		this.setState({
			loading: true,
			message: null,
			error_message: null,
		});
		const email = document.getElementById("email").value;
		const password = document.getElementById("password").value;

		const form_data = {
			email: email,
			password: password,
		};

		console.log(form_data);
		this.loginAction(form_data);
	}

	render() {
		const { loading, error_message, message, loggedIn } = this.state;

		return (
			<>
				{loggedIn === true ? <Navigate to="/" /> : null}
				<div className="row justify-content-center">
					<div className="my-border my-form col-xs-12 col-md-6">
						<fieldset>
							<legend className="text-center my-heading">Login</legend>

							<div className="form-group">
								<label htmlFor="email">email</label>
								<input
									type="email"
									inputMode="email"
									id="email"
									required
									aria-describedby="emailHelp"
									className="form-control"
									aria-required="true"
									autoFocus
								/>
							</div>
							<div className="form-group">
								<label htmlFor="password">password</label>
								<input
									type="password"
									inputMode="text"
									id="password"
									className="form-control"
									aria-required="true"
									required
								/>
							</div>
							<div className="text-center">
								{loading ? (
									<div className="text-center mt-3">
										<Loading />
									</div>
								) : (
									<>
										{error_message ? (
											<div className="message-div error-div ">
												{error_message}
											</div>
										) : (
											<>
												{message ? (
													<div className="message-div success-div">
														{message}
													</div>
												) : null}
											</>
										)}
									</>
								)}
							</div>

							<div className="form-group">
								<MyButton
									className="btn btn-primary my-full-width my-btn"
									text="login"
									icon={<LoginIcon />}
									onClick={() => this.submitForm()}
								/>
							</div>
						</fieldset>
					</div>
				</div>
				<div className="row justify-content-center">
					<div className="sub-form my-border col-xs-12 col-md-6">
						Don't have an account? <Link to="/register">Register</Link>
					</div>
				</div>
			</>
		);
	}
}
