import React, { useEffect, useState } from "react";
import Aux from "../../hoc/Aux/Aux";
import Dropdown from "../Dropdowns/Dropdown";

const cities = [
  {
    id: -1,
    value: "",
    name: "All Cities"
  },
  {
    id: 0,
    value: "MUMBAI",
    name: "Mumbai"
  },
  {
    id: 1,
    value: "BANGALORE",
    name: "Bangalore"
  },
  {
    id: 2,
    value: "DELHI",
    name: "Delhi"
  },
  {
    id: 3,
    value: "KANPUR",
    name: "Kanpur"
  },
  {
    id: 4,
    value: "PUNE",
    name: "Pune"
  },
  {
    id: 5,
    value: "LUCKNOW",
    name: "Lucknow"
  },
  {
    id: 6,
    value: "CHENNAI",
    name: "Chennai"
  }
];
const fields = [
  {
    id: 5,
    value: "",
    name: "Select Category"
  },
  {
    id: 0,
    value: "bank_name",
    name: "Bank"
  },
  {
    id: 1,
    value: "ifsc",
    name: "IFSC"
  },
  {
    id: 2,
    value: "branch",
    name: "Branch"
  },
  {
    id: 3,
    value: "bank_id",
    name: "Bank id"
  },
  {
    id: 4,
    value: "address",
    name: "Address"
  }
];

/* function component declaration */

const filters = props => {
  const [state, setState] = useState({
    cities: cities,
    fields: fields
  });

  useEffect(() => {
    if (props.hideDefault) {
      let cities = [...state.cities];
      cities.shift();
      setState({ cities: cities, fields: state.fields });
    }
  }, [props.hideDefault, props.onSelected]);
  return (
    <Aux>
      <Dropdown
        typeId={"City"}
        clicked={props.onSelected}
        options={state.cities}
        selected={props.selectedCity}
        isDisabled={props.isDisabled}
      />
      <Dropdown
        typeId={"Field"}
        clicked={props.onSelected}
        options={state.fields}
        isDisabled={props.isDisabled}
        selected={props.selectedCategory}
      />
    </Aux>
  );
};

export default filters;
