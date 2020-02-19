import React from "react";
import classes from "./BankDetails.css";
import { useLocation, useHistory } from "react-router-dom";
import Star from "../../../assets/icons/star.svg";
import StarFilled from "../../../assets/icons/star_filled.svg";
import Return from "../../../assets/icons/return.svg";

const bankDetails = props => {
  const location = useLocation();
  const history = useHistory();
  const bank = location.state.bank;

  const back = () => {
    history.goBack();
  };

  const imageSrc = location.state.isFavourite ? StarFilled : Star;

  return (
    <div className={classes.BankDetails}>
      <p onClick={back} className={classes.Back}>
        <img src={Return} alt="back_icon" />
        Go Back
      </p>
      <div className={classes.ImageContainer}>
        <img src={imageSrc} alt="favourite" />
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
  );
};

export default bankDetails;
