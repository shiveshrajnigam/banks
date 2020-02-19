import React from "react";
import classes from "./Dropdown.css";

const dropdown = props => {
  const options = props.options.map(option => {
    return (
      <option key={option.id} value={option.value}>
        {option.name}
      </option>
    );
  });

  const onChangeHandler = event => {
    props.clicked(event, props.typeId);
  };

  const classNames = [classes.Dropdown];
  props.hideBorders
    ? classNames.push(classes.NoBorder)
    : classNames.push(classes.BorderBottom);
  return (
    <select
      id={props.typeId}
      onChange={onChangeHandler}
      className={classNames.join(" ")}
      disabled={props.isDisabled}
      defaultValue={props.selected}
    >
      {options}
    </select>
  );
};

export default dropdown;
