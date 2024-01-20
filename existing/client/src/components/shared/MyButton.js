import React, { Component } from "react";

export default class MyButton extends Component {
  render() {
    const { text, type, className, id, onClick, disabled, icon } = this.props;
    return (
      <>
        <button
          className={className}
          type={type}
          id={id}
          onClick={onClick}
          disabled={disabled}
        >
          {icon} {text}
        </button>
      </>
    );
  }
}
