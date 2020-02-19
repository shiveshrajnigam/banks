import React, { useEffect } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Star from "../../../assets/icons/star.svg";
import StarFilled from "../../../assets/icons/star_filled.svg";

const row = props => {
  useEffect(() => {}, [props.isFavourite]);

  const imageSrc = props.isFavourite ? StarFilled : Star;
  return (
    <Aux>
      <tr onClick={props.clicked}>
        <td onClick={props.updateFavourite} style={{ textAlign: "center" }}>
          <img
            src={imageSrc}
            alt="fav_img"
            style={{ height: "20px", cursor: "pointer" }}
          />
        </td>
        <td>{props.bank.bank_name}</td>
        <td>{props.bank.ifsc}</td>
        <td>{props.bank.branch}</td>
        <td>{props.bank.bank_id}</td>
        <td>{props.bank.address}</td>
      </tr>
    </Aux>
  );
};

export default row;
