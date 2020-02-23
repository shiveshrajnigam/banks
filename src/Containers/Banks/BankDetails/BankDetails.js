import React, { useState } from "react";
import classes from "./BankDetails.css";
import { useLocation, useHistory } from "react-router-dom";
import Star from "../../../assets/icons/star.svg";
import StarFilled from "../../../assets/icons/star_filled.svg";
import Return from "../../../assets/icons/return.svg";

const bankDetails = props => {
  const location = useLocation();
  const history = useHistory();
  const bank = location.state
    ? location.state.bank
    : props.history.push({
        pathname: "/banks"
      });

  const back = () => {
    history.goBack();
  };

  const [state, setState] = useState({
    imageSrc: location.state
      ? location.state.isFavourite
        ? StarFilled
        : Star
      : null
  });

  const updateFavourite = (event, bankDetails = bank) => {
    let favBanks = JSON.parse(localStorage.getItem("fav_banks"));
    let index = favBanks.findIndex(bank => bank.ifsc === bankDetails.ifsc);
    if (index > -1) {
      favBanks.splice(index, 1);
      setState({ imageSrc: Star });
    } else {
      favBanks.push(bankDetails);
      setState({ imageSrc: StarFilled });
    }
    localStorage.setItem("fav_banks", JSON.stringify(favBanks));
    event.stopPropagation();
  };

  const bankDetails = bank ? (
    <div className={classes.BankDetails}>
      <p onClick={back} className={classes.Back}>
        <img src={Return} alt="back_icon" />
        Go Back
      </p>
      <div className={classes.ImageContainer}>
        <img
          src={state.imageSrc}
          alt="favourite"
          className={classes.CursorPointer}
          onClick={updateFavourite.bind(this)}
        />
      </div>
      <div className={classes.DetailsContainer}>
        <p className={classes.Title}>
          Bank Name: <span>{bank.bank_name}</span>
        </p>
        <p>
          IFSC: <span>{bank.ifsc}</span>
        </p>
        <p>
          Branch: <span>{bank.branch}</span>
        </p>
        <p>
          Bank Id: <span>{bank.bank_id}</span>
        </p>
        <p>
          Address: <span>{bank.address}</span>
        </p>
      </div>
    </div>
  ) : null;
  return bank ? bankDetails : null;
};

export default bankDetails;
