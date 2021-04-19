import React from "react";
import "components/Button.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

export default function Button(props) {

  Button.propTypes = {
    confirm: PropTypes.bool,
    danger: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
    disabled: PropTypes.bool,
    children: PropTypes.string.isRequired
  };

  let buttonClass = classNames("button", {
    "button--confirm": props.confirm,
    "button--danger": props.danger
  });

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );

}
