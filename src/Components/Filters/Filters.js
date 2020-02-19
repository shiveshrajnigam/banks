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
    name: "MUMBAI"
  },
  {
    id: 1,
    value: "BANGALORE",
    name: "BANGALORE"
  },
  {
    id: 2,
    value: "DELHI",
    name: "DELHI"
  },
  {
    id: 3,
    value: "KANPUR",
    name: "KANPUR"
  },
  {
    id: 4,
    value: "PUNE",
    name: "PUNE"
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
