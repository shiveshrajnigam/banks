import React from "react";
import classes from "./AppState.css";

const appState = props => (
  <div className={classes.AlignCenter}>{props.children}</div>
);

export default appState;
