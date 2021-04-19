import React from "react";
import PropTypes from "prop-types";

export default function Header(props) {

  Header.propTypes = {
    time: PropTypes.string.isRequired
  };

  return (
    <header className="appointment__time">
      <h4 className="text--semi-bold">{props.time}</h4>
      <hr className="appointment__separator" />
    </header>
  );

}