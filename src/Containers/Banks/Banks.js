import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "../../hoc/Layout/Layout.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AllBanks from "./All/All";
import BankDetails from "../Banks/BankDetails/BankDetails";
import Favourites from "./Favourites/Favourites";

class Banks extends Component {
  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log(this.state, nextState, nextProps);
  //   return true;
  //   // return this.state.selectedCity !== nextState.selectedCity;
  // }

  render() {
    return (
      <Aux>
        <div className={classes.Layout}>
          <Switch>
            <Route path="/banks" exact component={AllBanks} />
            <Route path="/banks/:id" exact component={BankDetails} />
            <Route path="/favourites" exact component={Favourites} />
            <Redirect from="/" to="/banks" />
          </Switch>
        </div>
      </Aux>
    );
  }
}

export default Banks;
