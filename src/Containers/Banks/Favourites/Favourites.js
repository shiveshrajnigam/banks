import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Bank from "../../../Components/Table/Row/Row";
import Footer from "../../../Components/Table/Footer/Footer";
import _ from "lodash";
import classes from "../Banks/Banks.css";
import Filters from "../../../Components/Filters/Filters";
import Searchbar from "../../../Components/SearchBar/SearchBar";
import StateContainer from "../../../Components/AppState/AppState";

class Favourites extends Component {
  state = {
    banks: [],
    allBanks: [],
    selectedCity: "",
    selectedField: "",
    searchField: null,
    pageNumber: 0,
    pageSize: 15,
    totalRecords: 0,
    isLoading: false,
    searchText: ""
  };
  componentDidMount() {
    if (localStorage.getItem("fav_banks")) {
      const banks = JSON.parse(localStorage.getItem("fav_banks"));
      this.setState({
        banks: _.take(banks, this.state.pageSize),
        allBanks: _.chunk(banks, this.state.pageSize),
        totalRecords: banks.length,
        pageNumber: 0,
        selectedCity: this.state.selectedCity
      });
    }
  }

  dropdownChangeHandler = (event, type) => {
    if (type === "City") {
      let filteredBanks = this.reshape([...this.state.allBanks]);
      filteredBanks = this.filterWithField(
        filteredBanks,
        this.state.searchText
      );
      if (event.target.value.trim().length) {
        filteredBanks = this.filterWithCity(filteredBanks, event.target.value);
      }
      this.setState({
        selectedCity: event.target.value,
        banks: filteredBanks,
        searchText: ""
      });
    }
    if (type === "Field") {
      this.setState({
        selectedField: event.target.value,
        searchField: event.target.selectedOptions[0].text
      });
    }
  };

  filterWithField = (filteredArray, value) => {
    if (this.state.selectedField.length && value.trim().length) {
      return filteredArray.filter(bank => {
        return (
          bank[this.state.selectedField]
            .toString()
            .toLowerCase()
            .indexOf(value.toLowerCase()) > -1
        );
      });
    }
    return filteredArray;
  };

  filterWithCity = (filteredArray, city) => {
    return filteredArray.filter(elem => elem.city === city);
  };

  reshape = array => {
    return array.reduce((ac, c) => ac.concat(c), []);
  };

  searchTextHandler = value => {
    let banks = this.reshape(this.state.allBanks);
    if (value.trim().length && this.state.selectedField.trim().length) {
      banks = this.filterWithField(banks, value);
      if (this.state.selectedCity && this.state.selectedCity.trim().length) {
        banks = this.filterWithCity(banks, this.state.selectedCity);
      }
      this.setState({
        banks: banks,
        totalRecords: banks.length,
        pageNumber: 0,
        searchText: value
      });
    } else {
      this.setState({
        banks: this.state.allBanks[this.state.pageNumber].filter(bank =>
          this.state.selectedCity ? bank.city === this.state.selectedCity : true
        ),
        totalRecords: banks.length
      });
    }
  };

  onRowClick = bank => {
    this.props.history.push({
      pathname: "/banks/" + bank.bank_id,
      state: {
        bank: bank,
        isFavourite: this.favouriteBankIndex(bank) > -1 ? true : false
      }
    });
  };

  updateFavourite(bankDetails, event) {
    let favBanks = JSON.parse(localStorage.getItem("fav_banks"));
    if (this.favouriteBankIndex(bankDetails) > -1) {
      favBanks.splice(this.favouriteBankIndex(bankDetails), 1);
    } else {
      favBanks.push(bankDetails);
    }
    this.setState({
      updateFavourite: true,
      banks: favBanks,
      allBanks: _.chunk(favBanks, this.state.pageSize),
      totalRecords: favBanks.length
    });
    localStorage.setItem("fav_banks", JSON.stringify(favBanks));
    event.stopPropagation();
  }

  favouriteBankIndex = bankDetails => {
    const favBanks = JSON.parse(localStorage.getItem("fav_banks"));
    return favBanks.findIndex(bank => bank.ifsc === bankDetails.ifsc);
  };

  loadRecords = type => {
    if (type === "prev") {
      let pageNumber = this.state.pageNumber ? this.state.pageNumber - 1 : 0;
      this.setState({
        pageNumber: pageNumber,
        banks: this.state.allBanks[pageNumber]
      });
    }
    if (type === "next") {
      if (this.state.pageNumber < this.state.allBanks.length - 1) {
        let pageNumber = this.state.pageNumber + 1;
        this.setState({
          pageNumber: pageNumber,
          banks: this.state.allBanks[pageNumber]
        });
      }
    }
  };

  pageSizeHandler = event => {
    const newPageSize =
      +event.target.value > 0 && +event.target.value < this.state.totalRecords
        ? +event.target.value
        : this.state.totalRecords;
    const allBanks = this.reshape([...this.state.allBanks]);
    const banks = _.take(allBanks, newPageSize);
    this.setState({
      pageSize: newPageSize,
      banks: banks,
      allBanks: _.chunk(allBanks, newPageSize),
      pageNumber: 0
    });
  };

  render() {
    const banks = [...this.state.banks].map(bank => {
      return (
        <Bank
          key={bank.ifsc}
          bank={bank}
          clicked={() => this.onRowClick(bank)}
          isFavourite={this.favouriteBankIndex(bank) > -1 ? true : false}
          updateFavourite={this.updateFavourite.bind(this, bank)}
        />
      );
    });
    let filters = null;
    if (!this.state.isLoading) {
      const placeholder =
        this.state.searchField && this.state.selectedField
          ? "Search with " + this.state.searchField
          : "Select a category to search";
      filters = (
        <div
          style={{
            fontWeight: "400",
            display: "inline-block",
            width: "70%",
            textAlign: "right"
          }}
        >
          <span>
            <Filters
              onSelected={this.dropdownChangeHandler.bind(this)}
              selectedCity={this.state.selectedCity}
              selectedCategory={this.state.selectedField}
            />
          </span>
          <span>
            <Searchbar
              onInput={this.searchTextHandler.bind(this)}
              placeholder={placeholder}
              disable={this.state.selectedField ? false : true}
            />
          </span>
        </div>
      );
    }

    return (
      <Aux>
        <div style={{ padding: "30px" }}>
          <div className={classes.FixHeader}>
            <div
              style={{
                fontWeight: "400",
                display: "inline-block",
                width: "30%",
                fontSize: "1.2em"
              }}
            >
              <strong>Favourite Banks</strong>
            </div>
            {filters}
          </div>
          <table className={classes.Table}>
            <thead>
              <tr>
                <th>Star</th>
                <th>Bank</th>
                <th>IFSC</th>
                <th>Branch</th>
                <th>Bank Id</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>{this.state.banks.length ? banks : null}</tbody>
          </table>
          {!this.state.banks.length ? (
            <StateContainer>No result found!</StateContainer>
          ) : null}
        </div>
        {this.state.banks.length ? (
          <Footer
            adjustPageSize={this.pageSizeHandler.bind(this)}
            pageSize={this.state.pageSize}
            pageNumber={this.state.pageNumber}
            totalRecords={this.state.totalRecords}
            clicked={this.loadRecords.bind(this)}
          />
        ) : null}
      </Aux>
    );
  }
}

export default Favourites;
