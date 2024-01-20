import React, { Component } from "react";
import { Navigate, Link } from "react-router-dom";

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

		this.submit = this.submit.bind(this);
		this.registerAction = this.registerAction.bind(this);
	}

	registerAction(form_data) {
		const url = backend_url + "api/user/";

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
	}

	submit(e) {
		this.setState({
			loading: true,
			message: null,
			error_message: null,
		});
		e.preventDefault();

		const email = document.getElementById("email").value.trim();
		const password = document.getElementById("password").value.trim();
		const password_confirmation = document
			.getElementById("password_confirmation")
			.value.trim();

		const first_name = document.getElementById("first_name").value.trim();
		const last_name = document.getElementById("last_name").value.trim();

		const form_data = {
			email: email,
			password: password,
			password_confirmation: password_confirmation,
			first_name: first_name,
			last_name: last_name,
		};

		this.registerAction(form_data);
	}
	render() {
		const { loading, message, error_message, loggedIn } = this.state;
		return (
			<div className="row justify-content-center">
				{loggedIn === true ? <Navigate to="/" /> : null}
				<form
					className="my-border my-form col-xs-12 col-md-6"
					onSubmit={this.submit}
				>
					{loggedIn === true ? <Navigate to="/" /> : null}
					<fieldset>
						<legend className="text-center my-heading">Registration</legend>

						<div className="form-group">
							<label htmlFor="email">Email</label>
							<input
								type="email"
								inputMode="email"
								id="email"
								className="form-control"
								aria-required="true"
								required
								autoFocus
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password">Password</label>
							<input
								type="password"
								inputMode="text"
								id="password"
								className="form-control"
								aria-required="true"
								required
							/>
						</div>
						<div className="form-group">
							<label htmlFor="password_confirmation">Confirm password</label>
							<input
								type="password"
								inputMode="text"
								id="password_confirmation"
								className="form-control"
								aria-required="true"
								required
							/>
						</div>

						<div className="form-group">
							<label htmlFor="first_name">First name</label>
							<input
								type="text"
								inputMode="text"
								id="first_name"
								className="form-control"
								aria-required="true"
								required
								autoCapitalize="words"
							/>
						</div>

						<div className="form-group">
							<label htmlFor="last_name">Last name</label>
							<input
								type="text"
								inputMode="text"
								id="last_name"
								className="form-control"
								autoCapitalize="words"
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
										<div className="message-div error-div">{error_message}</div>
									) : (
										<>
											{message ? (
												<div className="message-div success-div">{message}</div>
											) : null}
										</>
									)}
								</>
							)}
						</div>

						<div>
							<MyButton
								text="register"
								type="submit"
								className="btn btn-primary my-full-width my-btn"
								disabled={loading}
								icon={<LoginIcon />}
							/>
						</div>
					</fieldset>
				</form>

				<div className="row justify-content-center">
					<div className="sub-form my-border col-xs-12 col-md-6 ">
						Already have an account? <Link to="/login">Login</Link>
					</div>
				</div>
			</div>
		);
	}
}
