import React from "react";
import classes from "./SearchBar.css";
import Aux from "../../hoc/Aux/Aux";
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
    <Aux>
      <span>
        <img src={SearchIcon} className={classes.SearchIcon} alt="search" />
      </span>
      <input
        type="text"
        onKeyUp={debounceRequest.bind(this)}
        id="searchbar"
        className={classes.Searchbar}
        placeholder={placeholder}
        disabled={props.disable}
      />
    </Aux>
  );
};

export default searchBar;
