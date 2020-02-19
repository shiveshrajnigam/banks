import React from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "../Navigation/Sidebar.css";

const sidebar = props => {
  return (
    <Aux>
      <div className={classes.Sidebar}>{props.children}</div>
    </Aux>
  );
};

export default sidebar;
