import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import { Layout } from "antd";
const { Footer } = Layout;
class footerComponent extends Component {
  state = {};
  render() {
    return (
      <Footer
        style={{
          backgroundColor: "#2BBBAD",
          color: "#FFF",
          textAlign: "center",
          width: "100%"
        }}
      >
        <p>Copyright ©2019 All rights reserved Embiot Technologies </p>
      </Footer>
    );
  }
}

export default footerComponent;
