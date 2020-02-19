import React, { Component } from "react";
import Aux from "../../../hoc/Aux/Aux";
import Bank from "../../../Components/Table/Row/Row";
import Footer from "../../../Components/Table/Footer/Footer";
import axios from "axios";
import _ from "lodash";
import Filters from "../../../Components/Filters/Filters";
import classes from "./All.css";
import StateContainer from "../../../Components/AppState/AppState";
import Searchbar from "../../../Components/SearchBar/SearchBar";

// const CancelToken = axios.CancelToken;
// const source = CancelToken.source();

class All extends Component {
  state = {
    banks: [],
    allBanks: [],
    selectedCity: "MUMBAI",
    selectedField: "",
    searchField: null,
    pageNumber: 0,
    pageSize: 10,
    totalRecords: 0,
    isLoading: true,
    updateFavourite: false,
    searchText: ""
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
      updateFavourite: true
    });
    localStorage.setItem("fav_banks", JSON.stringify(favBanks));
    event.stopPropagation();
  }

  favouriteBankIndex = bankDetails => {
    const favBanks = JSON.parse(localStorage.getItem("fav_banks"));
    return favBanks.findIndex(bank => bank.ifsc === bankDetails.ifsc);
  };

  dropdownChangeHandler = (event, type) => {
    if (type === "City") {
      this.setState({ selectedCity: event.target.value, searchText: "" });
    }
    if (type === "Field") {
      this.setState({
        selectedField: event.target.value,
        searchText: "",
        searchField: event.target.selectedOptions[0].text
      });
    }
  };

  reshape = (array, n) => {
    return array.reduce((ac, c) => ac.concat(c), []);
  };

  searchTextHandler = value => {
    let banks = this.reshape(this.state.allBanks);
    if (value.trim().length && this.state.selectedField) {
      this.setState({ searchText: value });
      let filteredObj = banks.filter(bank => {
        return (
          bank[this.state.selectedField]
            .toString()
            .toLowerCase()
            .indexOf(value.toLowerCase()) > -1
        );
      });
      this.setState({
        banks: _.take(filteredObj, this.state.pageSize),
        totalRecords: filteredObj.length,
        pageNumber: 0
      });
    } else {
      this.setState({
        banks: this.state.allBanks[this.state.pageNumber],
        totalRecords: banks.length
      });
    }
  };

  componentDidMount() {
    if (!localStorage.getItem("fav_banks")) {
      localStorage.setItem("fav_banks", JSON.stringify([]));
    }
    this.getBankList();
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;
    // return this.state.selectedCity !== nextState.selectedCity;
  }

  componentDidUpdate(prevProps, prevState) {
    // const didPageSizeUpdate = this.state.pageSize !== prevState.pageSize;
    const didCityUpdate = this.state.selectedCity !== prevState.selectedCity;
    if (this.state.selectedCity && didCityUpdate) {
      this.setState({
        isLoading: true
      });
      this.getBankList(this.state.selectedCity);
    }
  }

  // componentWillUnmount() {
  //   source.cancel("Operation canceled by the user.");
  // }

  getBankList = (city = this.state.selectedCity) => {
    axios
      .get(`https://vast-shore-74260.herokuapp.com/banks?city=${city}`, {
        // cancelToken: source.token
      })
      .then(response => {
        this.setState({
          banks: _.take(response.data, this.state.pageSize),
          allBanks: _.chunk(response.data, this.state.pageSize),
          totalRecords: response.data.length,
          pageNumber: 0,
          selectedCity: city,
          searchText: ""
        });
        document.getElementById("searchbar").value = "";
      })
      .catch(function(thrown) {
        if (axios.isCancel(thrown)) {
        } else {
        }
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  filterWithField = (filteredArray, value = this.state.searchText) => {
    if (
      this.state.selectedField.length &&
      this.state.searchText.trim().length
    ) {
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

  getLoadedBanks = () => {
    return _.chunk(
      this.filterWithField(this.reshape([...this.state.allBanks])),
      this.state.pageSize
    );
  };

  loadRecords = type => {
    const allBanks = this.getLoadedBanks();
    if (type === "prev") {
      let pageNumber = this.state.pageNumber ? this.state.pageNumber - 1 : 0;
      this.setState({
        pageNumber: pageNumber,
        banks: allBanks[pageNumber]
      });
    }
    if (type === "next") {
      if (this.state.pageNumber < allBanks.length - 1) {
        let pageNumber = this.state.pageNumber + 1;
        this.setState({
          pageNumber: pageNumber,
          banks: allBanks[pageNumber]
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
            onSelected={this.dropdownChangeHandler}
            isDisabled={this.state.isLoading}
            hideDefault={true}
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

    return (
      <div style={{ padding: "30px 30px 0" }}>
        <Aux>
          <div style={{ padding: "8px" }}>
            <div
              style={{
                fontWeight: "400",
                display: "inline-block",
                width: "30%",
                fontSize: "1.2em"
              }}
            >
              <i>Banks</i>
            </div>
            {filters}
          </div>
          {!this.state.isLoading ? (
            <Aux>
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
                <tbody>
                  {this.state.banks.length ? (
                    banks
                  ) : (
                    <tr style={{ border: "none", width: "100%" }}>
                      <td style={{ border: "none" }}>
                        <i>No Results Found.</i>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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
          ) : (
            <StateContainer>
              <i>Loading bank details...</i>
            </StateContainer>
          )}
        </Aux>
      </div>
    );
  }
}

export default All;
