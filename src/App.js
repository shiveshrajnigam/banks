import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Banks from "./Containers/Banks/Banks";

class App extends Component {
  render() {
    return (
      <div>
        <Layout />
        <Banks />
      </div>
    );
  }
}

export default App;
