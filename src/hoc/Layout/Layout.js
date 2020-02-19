import React from "react";
import Aux from "../Aux/Aux";
import { NavLink } from "react-router-dom";
import classes from "../../Components/Navigation/Sidebar.css";
import Sidebar from "../../Components/Navigation/Sidebar";

const layout = props => {
  return (
    <Aux>
      <Sidebar>
        <div>
          <NavLink to="/banks" activeClassName={classes.ActiveLink}>
            Banks
          </NavLink>
        </div>
        <div>
          <NavLink to="/favourites" activeClassName={classes.ActiveLink}>
            Favourites
          </NavLink>
        </div>
      </Sidebar>
    </Aux>
  );
};

export default layout;
