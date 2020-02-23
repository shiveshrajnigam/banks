import React from "react";
import classes from "./Footer.css";
import Dropdown from "../../Dropdowns/Dropdown";
import Previous from "../../../assets/icons/chevron-left.svg";
import Next from "../../../assets/icons//chevron-right.svg";

const pageSize = [
  {
    id: 0,
    value: 10,
    name: 10
  },
  {
    id: 1,
    value: 15,
    name: 15
  },
  {
    id: 2,
    value: 20,
    name: 20
  },
  {
    id: 3,
    value: 25,
    name: 25
  },
  {
    id: 4,
    value: 50,
    name: 50
  },
  {
    id: 5,
    value: 100,
    name: 100
  }
];

const footer = props => {
  const pageLength =
    props.pageSize < props.totalRecords ? props.pageSize : props.totalRecords;
  return (
    <div
      className={[classes.Footer, pageLength >= 15 ? classes.Shadow : ""].join(
        " "
      )}
    >
      <div style={{ marginRight: "30px" }}>
        Rows per page:{" "}
        <Dropdown
          typeId={"pageSize"}
          hideBorders={true}
          clicked={props.adjustPageSize}
          options={pageSize}
          selected={props.pageSize}
        />
        <span>
          {props.pageNumber * props.pageSize + 1} -{" "}
          {(props.pageNumber + 1) * pageLength < props.totalRecords
            ? (props.pageNumber + 1) * pageLength
            : props.totalRecords}{" "}
          of {props.totalRecords}
        </span>
        {/* previous page button */}
        <span>
          <img
            src={Previous}
            className={[classes.Icons, classes.CursorPointer].join(" ")}
            alt="previous"
            onClick={() => props.clicked("prev")}
          />
        </span>
        {/* next page button */}
        <span>
          <img
            src={Next}
            className={[classes.Icons, classes.CursorPointer].join(" ")}
            alt="next"
            onClick={() => props.clicked("next")}
          />
        </span>
      </div>
    </div>
  );
};

export default footer;
