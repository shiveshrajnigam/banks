import React from "react";
import Aux from "../Aux/Aux";
import { NavLink } from "react-router-dom";
import classes from "../../Components/Navigation/Sidebar.css";
import Sidebar from "../../Components/Navigation/Sidebar";
import Star from "../../assets/icons/star_grey.svg";
import BankIcon from "../../assets/icons/bank.svg";

const layout = props => {
  return (
    <Aux>
      <Sidebar>
        <div>
          <NavLink to="/banks" activeClassName={classes.ActiveLink}>
            <img src={BankIcon} alt="fav" className={classes.Icons} />
            Banks
            <div className={classes.triangle}></div>
          </NavLink>
        </div>
        <div>
          <NavLink to="/favourites" activeClassName={classes.ActiveLink}>
            <img src={Star} alt="fav" className={classes.Icons} />
            Favourites
            <div className={classes.triangle}></div>
          </NavLink>
        </div>
      </Sidebar>
    </Aux>
  );
};

export default layout;
