import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames/bind";
import PropTypes from "prop-types";

export default function DayListItem(props) {

  DayListItem.propTypes = {
    selected: PropTypes.bool,
    spots: PropTypes.number.isRequired,
    setDay: PropTypes.func,
    name: PropTypes.string.isRequired
  };

  // Return a descriptive representation for the given number of spots
  const formatSpots = (spots) => {
    let str = "";
    if (!spots) {
      str = "no spots";
    } else if (spots === 1) {
      str = "1 spot";
    } else {
      str = `${spots} spots`;
    }
    return str + " remaining";
  };

  let dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });

  return (
    <li
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}
      data-testid="day"
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );

}