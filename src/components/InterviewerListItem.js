import React from "react";
import "./InterviewerListItem.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

export default function InterviewerListItem(props) {

  InterviewerListItem.propTypes = {
    selected: PropTypes.bool.isRequired,
    setInterviewer: PropTypes.func.isRequired,
    avatar: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  };

  const interviewerListItemClass = classNames("interviewers__item", {
    "interviewers__item--selected": props.selected,
  });

  return (
    <li
      className={interviewerListItemClass}
      onClick={props.setInterviewer}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.selected && props.name}
    </li>
  );

}