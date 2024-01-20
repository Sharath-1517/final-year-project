import React from "react";
import { Link, useNavigate } from "react-router-dom";

//css
import "../../styles/header.css";

//utils
import { deleteCookie } from "../../utils/cookie/deleteCookie";

function Index(props) {
	var navigate = useNavigate();
	function logout() {
		deleteCookie("loggedIn");
		deleteCookie("jwt");
		navigate("/login");
	}

	return (
		<header id="header">
			<div className="container">
				<nav
					className="navbar navbar-expand-lg theme-color fixed-top shadow-lg"
					id="nav"
				>
					<button
						className="navbar-toggler navbar-dark"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>

					<div className="collapse navbar-collapse" id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto">
							<li className="nav-item">
								<Link className="nav-link" to="/">
									<i className="fa fa-home" aria-hidden="true"></i> Home
								</Link>
							</li>

							<li className="nav-item dropdown">
								<span
									className="nav-link dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									Profile
								</span>
								<div
									className="dropdown-menu text-center"
									aria-labelledby="navbarDropdown"
								>
									<Link className="nav-link dropdown-item" to="/my_courses">
										<i className="fa fa-user" aria-hidden="true"></i> My Courses
									</Link>

									<span
										className="btn btn-danger"
										role="button"
										onClick={() => logout()}
									>
										<i className="fa fa-sign-out" aria-hidden="true"></i> Log
										out
									</span>
								</div>
							</li>
						</ul>
					</div>
				</nav>
			</div>
		</header>
	);
}

export default Index;
