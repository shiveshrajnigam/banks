import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import classes from "../../hoc/Layout/Layout.css";
import { Route, Switch, Redirect } from "react-router-dom";
import AllBanks from "./Banks/Banks";
import BankDetails from "./BankDetails/BankDetails";
import Favourites from "./Favourites/Favourites";

class Banks extends Component {
  render() {
    return (
      <Aux>
        <div className={classes.Layout}>
          <Switch>
            <Route path="/banks" exact component={AllBanks} />
            <Route path="/banks/:id" component={BankDetails} />
            <Route path="/favourites" exact component={Favourites} />
            <Redirect from="/" to="/banks" />
          </Switch>
        </div>
      </Aux>
    );
  }
}

export default Banks;
