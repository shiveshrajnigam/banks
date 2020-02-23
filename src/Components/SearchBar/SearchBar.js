import React from "react";
import classes from "./SearchBar.css";
import SearchIcon from "../../assets/icons/search.svg";

const searchBar = props => {
  let timer = null;
  const debounceRequest = event => {
    clearTimeout(timer);
    let value = event.target.value;
    timer = setTimeout(() => {
      console.log(value);
      props.onInput(value);
    }, 500);
  };
  const placeholder = props.placeholder ? props.placeholder : "search";
  return (
    <div className={classes.SearchbarContainer}>
      <img
        src={SearchIcon}
        className={[
          classes.SearchIcon,
          props.disable ? classes.Disable : ""
        ].join(" ")}
        alt="search"
      />
      <input
        type="text"
        onKeyUp={debounceRequest.bind(this)}
        id="searchbar"
        className={classes.Searchbar}
        placeholder={placeholder}
        disabled={props.disable}
      />
    </div>
  );
};

export default searchBar;
