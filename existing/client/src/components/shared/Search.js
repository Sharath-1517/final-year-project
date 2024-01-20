import React, { Component } from "react";

//Components
import MyButton from "../shared/MyButton";
import SearchIcon from "./icons/SearchIcon";

export default class Search extends Component {
  constructor(props) {
    super(props);

    this.search = this.search.bind(this);
  }

  async search(event) {
    event.preventDefault();

    console.info("searching..");

    const search_term = document.getElementById("search").value;
    this.props.onSearch(search_term);
  }

  render() {
    const { searching } = this.props;
    return (
      <div>
        <form onSubmit={this.search}>
          <div className="row">
            <div className="form-group col-xs-12 col-md-9">
              <input
                id="search"
                type="search"
                inputMode="search"
                className="form-control"
                aria-required="true"
                placeholder="Type to search..."
                autoFocus
                required
              />
            </div>
            <div className="form-group col-xs-12 col-md-3 ">
              <MyButton
                type="submit"
                text={searching ? "searching..." : "search"}
                className="btn btn-primary my-full-width"
                id="search_button"
                disabled={searching}
                icon={<SearchIcon />}
              />
            </div>
          </div>
        </form>
      </div>
    );
  }
}
