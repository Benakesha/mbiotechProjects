import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBNavLink,
  MDBIcon,
  MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu,
  MDBDropdownToggle
} from "mdbreact";
import { BrowserRouter as Router, withRouter, Link } from "react-router-dom";
import * as action from "../../stores/actions/index";
import { connect } from "react-redux";
import "./navigationComponent.css";

class navigationComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false
    };
    this.onClick = this.onClick.bind(this);
    this.onLogoutHandler = this.onLogoutHandler.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }
  onLogoutHandler = () => {
    this.props.onLogout();
  };

  render() {
    const bgPink = { backgroundColor: "#2BBBAD" };
    const container = { height: 1300 };
    const { match } = this.props;
    return (
      <div style={{ backgroundColor: "red" }}>
        <header>
          <MDBNavbar style={bgPink} dark expand="md" scrolling fixed="top">
            <MDBNavbarBrand href="/">
              <strong>MbioTech</strong>
              {/* <small>Embedded and IoT Platform</small> */}
            </MDBNavbarBrand>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active={"/dashboard" === match.path}>
                  <MDBNavLink to="/dashboard">
                    {" "}
                    <MDBIcon icon="street-view" />
                    &nbsp;Dashboard
                  </MDBNavLink>
                </MDBNavItem>
                {this.props.role === "admin" ? (
                  <MDBNavItem active={"/report" === match.path}>
                    <MDBNavLink to="report">
                      {" "}
                      <MDBIcon icon="address-book" />
                      &nbsp;Report
                    </MDBNavLink>
                  </MDBNavItem>
                ) : null}
                {this.props.role === "admin" ? (
                  <MDBNavItem active={"/adduser" === match.path}>
                    <MDBNavLink to="adduser">
                      <MDBIcon icon="user-plus" />
                      &nbsp;Add User
                    </MDBNavLink>
                  </MDBNavItem>
                ) : null}
                {this.props.role === "admin" ? (
                  <MDBNavItem active={"/users" === match.path}>
                    <MDBNavLink to="users">
                      <MDBIcon icon="users" />
                      &nbsp;Users
                    </MDBNavLink>
                  </MDBNavItem>
                ) : null}
                {this.props.role === "admin" ? (
                  <MDBNavItem active={"/sitedetails" === match.path}>
                    <MDBNavLink to="sitedetails">
                      <MDBIcon icon="book" />
                      &nbsp;Site Details
                    </MDBNavLink>
                  </MDBNavItem>
                ) : null}
              </MDBNavbarNav>
              <MDBNavbarNav right>
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      <MDBIcon icon="user" />
                    </MDBDropdownToggle>
                    <MDBDropdownMenu className="dropdown-default">
                      <MDBDropdownItem onClick={this.onLogoutHandler}>
                        Logout&nbsp;&nbsp;
                        <MDBIcon icon="sign-out-alt" />
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBNavbar>
        </header>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    role: state.auth.role
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(action.logout())
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(navigationComponent));
