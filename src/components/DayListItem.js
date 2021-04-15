import React from "react";
import "components/DayListItem.scss";
import classNames from "classnames/bind";

export default function DayListItem(props) {

  const formatSpots = (spots) => {
    let str = "";
    if (!spots) {
      str = "no spots";
    } else if (spots === 1) {
      str = "1 spot";
    } else {
      str = `${spots} spots`
    }
    return str + " remaining";
  }

  let dayListItemClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": !props.spots
  });
  return (
    <li
      className={dayListItemClass}
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2>
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );

}