import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import Banks from "./Containers/Banks/Router";

class App extends Component {
  render() {
    return (
      <div style={{ overflow: "auto" }}>
        <Layout />
        <Banks />
      </div>
    );
  }
}

export default App;
