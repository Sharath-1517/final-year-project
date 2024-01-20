import React, { Component } from "react";

import vid1 from "../../assets/videos/vid1.mp4";
import vid2 from "../../assets/videos/vid2.mp4";
import vid3 from "../../assets/videos/vid3.mp4";
import vid4 from "../../assets/videos/vid4.mp4";

export default class index extends Component {
	render() {
		return (
			<div className="row text-center">
				<h2>Course videos</h2>
				<span className="col-xs-12 col-md-6 my-5 px-5">
					<div className="card">
						<video
							className="card-img-top"
							src={vid1}
							alt="Card image cap"
							controls
						/>

						<div className="card-body">
							<h5 className="card-title">Lecture 1</h5>
						</div>
					</div>
				</span>

				<span className="col-xs-12 col-md-6 my-5 px-5">
					<div className="card">
						<video
							className="card-img-top"
							src={vid2}
							alt="Card image cap"
							controls
						/>

						<div className="card-body">
							<h5 className="card-title">Lecture 2</h5>
						</div>
					</div>
				</span>

				<span className="col-xs-12 col-md-6 my-5 px-5">
					<div className="card">
						<video
							className="card-img-top"
							src={vid3}
							alt="Card image cap"
							controls
						/>

						<div className="card-body">
							<h5 className="card-title">Lecture 3</h5>
						</div>
					</div>
				</span>

				<span className="col-xs-12 col-md-6 my-5 px-5">
					<div className="card">
						<video
							className="card-img-top"
							src={vid4}
							alt="Card image cap"
							controls
						/>

						<div className="card-body">
							<h5 className="card-title">Lecture 3</h5>
						</div>
					</div>
				</span>
			</div>
		);
	}
}
