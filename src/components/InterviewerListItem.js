import React from "react";

import "components/InterviewerListItem.scss";
import classNames from "classnames/bind";

export default function InterviewerListItem(props) {
  let interviewerListItemClass = classNames("interviewers__item", {
    "interviewers--selected": props.selected
  })

  return (
    <li
      className={interviewerListItemClass}
      onClick={() => props.setDay(props.name)}
    >
      <img
        className="interviewers__item-image"
        src={props.avatar}
        alt={props.name}
      />
      {props.name}
    </li>
  )
}