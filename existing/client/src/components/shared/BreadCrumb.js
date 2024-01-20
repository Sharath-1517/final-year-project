import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class BreadCrumb extends Component {
  render() {
    const { list } = this.props;
    return (
      <div
        className="container mb-2 white-background my-border pt-1 pb-1"
        id="breadcrumb"
      >
        <nav aria-label="breadcrumb ">
          <ol className="breadcrumb p-1 mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>

            {list.map((object, i) => {
              if (list.length - 1 === i) {
                // last one

                return (
                  <li className="breadcrumb-item active" key={i}>
                    <span className="breadcrumb-item active">
                      {object.name}
                    </span>
                  </li>
                );
              } else {
                // not last one

                return (
                  <li className="breadcrumb-item" key={i}>
                    <Link to={object.link}>{object.name}</Link>
                  </li>
                );
              }
            })}
          </ol>
        </nav>
      </div>
    );
  }
}
