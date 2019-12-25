import React, { Component } from "react";
import Aux from "../../hoc/Aux";
import {
  Layout,
  Row,
  Col,
  Input,
  Button,
  Icon,
  Form,
  Select,
  message,
  notification,
  Checkbox
} from "antd";
import "./dashboardComponent.css";
import validator from "validator";
import { connect } from "react-redux";
import { withRouter, Redirect } from "react-router-dom";
import * as action from "../../stores/actions/index";
import NavigationComponent from "../navigationComponent/navigationComponent";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressBook, faMapPin } from "@fortawesome/free-solid-svg-icons";
import axios from "../../axiosInterceptor";
import FooterComponent from "../footerComponent/footerComponent";
import { MDBContainer, MDBNotification } from "mdbreact";

const { Option } = Select;
const { Header, Content } = Layout;

const formValid1 = ({ formErrors, ...rest }) => {
  let valid = true;
  console.log("rr--", formErrors);
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });
  // Object.values(rest).forEach(val => {
  //   val === null && (valid = false);
  // });
  return valid;
};
const emailRegx = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const nameRegx = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;

//^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/g;
class dashboardComponent extends Component {
  _isMounted = false;
  state = {
    username: null,
    email: null,
    phoneNo: null,
    address: null,
    pincode: null,
    ctrname: "",
    ctrno: "",
    elname: "",
    elno: "",
    carpname: "",
    carpno: "",
    pantrname: "",
    pantrno: "",
    plumname: "",
    plumno: "",
    intname: "",
    intno: "",
    fabrname: "",
    fabrino: "",

    role: [],
    checked: {
      contractor: false,
      electritian: false,
      carpenter: false,
      painter: false,
      plumber: false,
      interior: false,
      fabricator: false
    },
    formError: {
      username: "",
      email: "",
      phoneNo: "",
      address: "",
      pincode: "",
      role: "",
      ctrname: "",
      ctrno: "",
      elname: "",
      elno: "",
      carpname: "",
      carpno: "",
      pantrname: "",
      pantrno: "",
      plumname: "",
      plumno: "",
      intname: "",
      intno: "",
      fabrname: "",
      fabrino: ""
    }
  };
  componentDidMount() {
    this._isMounted = true;
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onInputChange = e => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = this.state.formError;

    switch (name) {
      case "username":
        if (value.length > 0 && !nameRegx.test(value.trim())) {
          formErrors.username = "Please enter valid username";
        } else if (value.length < 3 && value.length > 0) {
          formErrors.username = "Min 3 character required";
        }
        // } else if (value.length > 0 && !nameRegx.test(value.trim())) {
        //   formErrors.username = "Not valid name";
        // }
        else {
          formErrors.username = "";
        }

        break;
      case "email":
        formErrors.email =
          emailRegx.test(value) && value.length > 0 ? "" : "Enter valid email";
        break;
      case "phoneNo":
        if (value.length < 10 && value.length > 0) {
          formErrors.phoneNo = "Enter valid phone number";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.phoneNo = "Phone number should be a number";
        } else if (value.length > 10) {
          formErrors.phoneNo = "Phone number should be 10 digit";
        } else {
          formErrors.phoneNo = "";
        }

        break;
      case "address":
        formErrors.address =
          value.trim() !== "" && value.length > 0 ? "" : "please enter address";
        break;
      case "pincode":
        if (value.length < 6 && value.length > 0) {
          formErrors.pincode = "Min 6 character required";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.pincode = "Pincode should be a number";
        } else if (value.length > 6 && value.length > 0) {
          formErrors.pincode = "Max 6 character allowed";
        } else {
          formErrors.pincode = "";
        }

        break;
      case "ctrname":
        if (value.length > 0 && !nameRegx.test(value.trim())) {
          formErrors.ctrname = "Please enter valid name";
        } else if (value.length < 3 && value.length > 0) {
          formErrors.ctrname = "Min 3 character required";
        } else {
          formErrors.ctrname = "";
        }
        break;
      case "ctrno":
        if (value.length < 10 && value.length > 0) {
          formErrors.ctrno = "Enter valid phone number";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.ctrno = "Phone number should be a number";
        } else if (value.length > 10) {
          formErrors.ctrno = "Phone number should be 10 digit";
        } else {
          formErrors.ctrno = "";
        }
        break;

      case "elname":
        if (value.length > 0 && !nameRegx.test(value.trim())) {
          formErrors.elname = "Please enter valid name";
        } else if (value.length < 3 && value.length > 0) {
          formErrors.elname = "Min 3 character required";
        } else {
          formErrors.elname = "";
        }
        break;
      case "elno":
        if (value.length < 10 && value.length > 0) {
          formErrors.elno = "Enter valid phone number";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.elno = "Phone number should be a number";
        } else if (value.length > 10) {
          formErrors.elno = "Phone number should be 10 digit";
        } else {
          formErrors.elno = "";
        }
        break;

      case "carpname":
        if (value.length > 0 && !nameRegx.test(value.trim())) {
          formErrors.carpname = "Please enter valid name";
        } else if (value.length < 3 && value.length > 0) {
          formErrors.carpname = "Min 3 character required";
        } else {
          formErrors.carpname = "";
        }
        break;
      case "carpno":
        if (value.length < 10 && value.length > 0) {
          formErrors.carpno = "Enter valid phone number";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.carpno = "Phone number should be a number";
        } else if (value.length > 10) {
          formErrors.carpno = "Phone number should be 10 digit";
        } else {
          formErrors.carpno = "";
        }
        break;
      case "pantrname":
        if (value.length > 0 && !nameRegx.test(value.trim())) {
          formErrors.pantrname = "Please enter valid name";
        } else if (value.length < 3 && value.length > 0) {
          formErrors.pantrname = "Min 3 character required";
        } else {
          formErrors.pantrname = "";
        }
        break;
      case "pantrno":
        if (value.length < 10 && value.length > 0) {
          formErrors.pantrno = "Enter valid phone number";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.pantrno = "Phone number should be a number";
        } else if (value.length > 10) {
          formErrors.pantrno = "Phone number should be 10 digit";
        } else {
          formErrors.pantrno = "";
        }
        break;
      case "plumname":
        if (value.length > 0 && !nameRegx.test(value.trim())) {
          formErrors.plumname = "Please enter valid name";
        } else if (value.length < 3 && value.length > 0) {
          formErrors.plumname = "Min 3 character required";
        } else {
          formErrors.plumname = "";
        }
        break;
      case "plumno":
        if (value.length < 10 && value.length > 0) {
          formErrors.plumno = "Enter valid phone number";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.plumno = "Phone number should be a number";
        } else if (value.length > 10) {
          formErrors.plumno = "Phone number should be 10 digit";
        } else {
          formErrors.plumno = "";
        }
        break;
      case "intname":
        if (value.length > 0 && !nameRegx.test(value.trim())) {
          formErrors.intname = "Please enter valid name";
        } else if (value.length < 3 && value.length > 0) {
          formErrors.intname = "Min 3 character required";
        } else {
          formErrors.intname = "";
        }
        break;
      case "intno":
        if (value.length < 10 && value.length > 0) {
          formErrors.intno = "Enter valid phone number";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.intno = "Phone number should be a number";
        } else if (value.length > 10) {
          formErrors.intno = "Phone number should be 10 digit";
        } else {
          formErrors.intno = "";
        }
        break;
      case "fabrname":
        if (value.length > 0 && !nameRegx.test(value.trim())) {
          formErrors.fabrname = "Please enter valid name";
        } else if (value.length < 3 && value.length > 0) {
          formErrors.fabrname = "Min 3 character required";
        } else {
          formErrors.fabrname = "";
        }
        break;
      case "fabrino":
        if (value.length < 10 && value.length > 0) {
          formErrors.fabrino = "Enter valid phone number";
        } else if (value.length > 0 && !validator.isInt(value.trim())) {
          formErrors.fabrino = "Phone number should be a number";
        } else if (value.length > 10) {
          formErrors.fabrino = "Phone number should be 10 digit";
        } else {
          formErrors.fabrino = "";
        }
        break;

      default:
        break;
    }

    this.setState({ formErrors, [name]: value }, () => {
      //console.log(this.state);
    });
  };
  onvisitorButtonClickHandler = e => {
    let {
      email,
      username,
      phoneNo,
      address,
      pincode,
      role,
      formError
    } = this.state;
    if (email === null) {
      formError.email = "Email field required";
    }
    if (username === null) {
      formError.username = "Username field required";
    }
    if (phoneNo === null) {
      formError.phoneNo = "Phone no field required";
    }
    if (address === null) {
      formError.address = "Address field required";
    }
    if (pincode === null) {
      formError.pincode = "Pincode field required";
    }
    if (role.length <= 0) {
      formError.role = "Role is required";
    }
    this.setState({ formError: formError });
  };

  selectChangeHandle = value => {
    //console.log("select value---", value);

    let formErrors = this.state.formError;
    let name = "role";
    switch (name) {
      case "role":
        formErrors.role = value.length <= 0 ? "please select role " : "";
        break;
      default:
        break;
    }
    this.setState({ formErrors, [name]: value }, () => {});
  };
  addvisitorSubmitHandler = e => {
    e.preventDefault();
    if (formValid1(this.state)) {
      const userData = {
        username: validator.escape(this.state.username),
        email: validator.escape(this.state.email),
        phoneNo: validator.escape(this.state.phoneNo),
        address: validator.escape(this.state.address),
        pincode: validator.escape(this.state.pincode),
        role: this.state.role,
        cname: validator.escape(this.state.ctrname),
        cphone: validator.escape(this.state.ctrno),
        elname: validator.escape(this.state.elname),
        elno: validator.escape(this.state.elno),
        carpname: validator.escape(this.state.carpname),
        carpno: validator.escape(this.state.carpno),
        pantrname: validator.escape(this.state.pantrname),
        pantrno: validator.escape(this.state.pantrno),
        plumname: validator.escape(this.state.plumname),
        plumno: validator.escape(this.state.plumno),
        intname: validator.escape(this.state.intname),
        intno: validator.escape(this.state.intno),
        fabrname: validator.escape(this.state.fabrname),
        fabrino: validator.escape(this.state.fabrino),
        executiveName: localStorage.getItem("username")
          ? validator.escape(localStorage.getItem("username"))
          : ""
      };
      axios
        .post("/visitor", { userData })
        .then(response => {
          if (response.status === 200) {
            // console.log(response.data.message);
            notification.open({
              message: response.data.message,
              duration: 2,
              top: 80
            });
          } else {
            notification.open({
              message: response.data.message,
              duration: 2,
              top: 80
            });
          }
        })
        .catch(error => {
          message.error(error);
        });
    }
  };

  onCheckboxChange2 = e => {
    if (e.target.name === "electritian" && e.target.checked) {
      let { checked } = this.state;
      checked.electritian = e.target.checked;
      this.setState({ checked: checked });
    } else {
      let { checked } = this.state;
      checked.electritian = e.target.checked;
      this.setState({ checked: checked });
    }
  };
  onCheckboxChange1 = e => {
    if (e.target.name === "contractor" && e.target.checked) {
      let { checked } = this.state;
      checked.contractor = e.target.checked;
      this.setState({ checked: checked });
    } else {
      let { checked } = this.state;
      checked.contractor = e.target.checked;
      this.setState({ checked: checked });
    }
  };
  onCheckboxChange3 = e => {
    if (e.target.name === "carpenter" && e.target.checked) {
      let { checked } = this.state;
      checked.carpenter = e.target.checked;
      this.setState({ checked: checked });
    } else {
      let { checked } = this.state;
      checked.carpenter = e.target.checked;
      this.setState({ checked: checked });
    }
  };
  onCheckboxChange4 = e => {
    if (e.target.name === "painter" && e.target.checked) {
      let { checked } = this.state;
      checked.painter = e.target.checked;
      this.setState({ checked: checked });
    } else {
      let { checked } = this.state;
      checked.painter = e.target.checked;
      this.setState({ checked: checked });
    }
  };

  onCheckboxChange5 = e => {
    if (e.target.name === "plumber" && e.target.checked) {
      let { checked } = this.state;
      checked.plumber = e.target.checked;
      this.setState({ checked: checked });
    } else {
      let { checked } = this.state;
      checked.plumber = e.target.checked;
      this.setState({ checked: checked });
    }
  };
  onCheckboxChange6 = e => {
    if (e.target.name === "interior" && e.target.checked) {
      let { checked } = this.state;
      checked.interior = e.target.checked;
      this.setState({ checked: checked });
    } else {
      let { checked } = this.state;
      checked.interior = e.target.checked;
      this.setState({ checked: checked });
    }
  };
  onCheckboxChange7 = e => {
    if (e.target.name === "fabricator" && e.target.checked) {
      let { checked } = this.state;
      checked.fabricator = e.target.checked;
      this.setState({ checked: checked });
    } else {
      let { checked } = this.state;
      checked.fabricator = e.target.checked;
      this.setState({ checked: checked });
    }
  };
  onInputChange1 = e => {};

  render() {
    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    let { formError } = this.state;
    return (
      <Row>
        <Col span={24}>
          <Layout>
            <NavigationComponent />
            <MDBContainer
              className="text-center mt-5"
              style={{ backgroundColor: "#FFF", paddingBottom: "5%" }}
            >
              <Content>
                <Row>
                  <Col
                    xs={{ span: 18, offset: 3 }}
                    sm={{ span: 12, offset: 7 }}
                    md={{ span: 10, offset: 7 }}
                    //     className="card"
                  >
                    <form
                      className="form"
                      onSubmit={this.addvisitorSubmitHandler}
                    >
                      <h3 className="h3">Site Visit Details</h3>
                      <Form.Item
                        className="formElement"
                        hasFeedback
                        validateStatus={
                          formError.username.length > 0 ? "error" : ""
                        }
                        help={formError.username}
                      >
                        <Input
                          required
                          placeholder="Owner Name"
                          name="username"
                          prefix={
                            <Icon
                              type="user"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          onChange={event => this.onInputChange(event)}
                        />
                      </Form.Item>
                      <Form.Item
                        className="formElement"
                        hasFeedback
                        validateStatus={
                          formError.email.length > 0 ? "error" : ""
                        }
                        help={formError.email}
                      >
                        <Input
                          placeholder="Email"
                          name="email"
                          prefix={
                            <Icon
                              type="ie"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          onChange={event => this.onInputChange(event)}
                        />
                      </Form.Item>
                      <Form.Item
                        className="formElement"
                        hasFeedback
                        validateStatus={
                          formError.phoneNo.length > 0 ? "error" : ""
                        }
                        help={formError.phoneNo}
                      >
                        <Input
                          placeholder="Phone number"
                          name="phoneNo"
                          prefix={
                            <Icon
                              type="phone"
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          onChange={event => this.onInputChange(event)}
                        />
                      </Form.Item>

                      <Form.Item
                        className="formElement"
                        hasFeedback
                        validateStatus={
                          formError.address.length > 0 ? "error" : ""
                        }
                        help={formError.address}
                      >
                        <Input.TextArea
                          placeholder="Address"
                          name="address"
                          onChange={event => this.onInputChange(event)}
                        />
                      </Form.Item>
                      <Form.Item
                        className="formElement"
                        hasFeedback
                        validateStatus={
                          formError.pincode.length > 0 ? "error" : ""
                        }
                        help={formError.pincode}
                      >
                        <Input
                          placeholder="Pincode"
                          name="pincode"
                          prefix={
                            <FontAwesomeIcon
                              icon={faMapPin}
                              style={{ color: "rgba(0,0,0,.25)" }}
                            />
                          }
                          onChange={event => this.onInputChange(event)}
                        />
                      </Form.Item>

                      <Form.Item
                        className="formElement"
                        hasFeedback
                        validateStatus={
                          formError.role.length > 0 ? "error" : ""
                        }
                        help={formError.role}
                      >
                        <Select
                          //defaultValue={["select"]}
                          style={{ width: "100%" }}
                          onChange={this.selectChangeHandle}
                          showArrow={true}
                          mode="multiple"
                          placeholder="Select Type of Site"
                        >
                          <Option key="select" value="select" disabled>
                            Select Type of Site
                          </Option>
                          <Option key="own" value="own">
                            Own
                          </Option>
                          <Option key="rent" value="rent">
                            Rent
                          </Option>
                          <Option key="hospital" value="hospital">
                            Hospital
                          </Option>
                          <Option key="hotel" value="hotel">
                            Hotel
                          </Option>
                          <Option key="restaurants" value="restaurants">
                            Restaurants/Inn
                          </Option>
                          <Option key="apartment" value="apartment">
                            Apartment
                          </Option>
                          <Option key="resort" value="resorts">
                            Resorts
                          </Option>
                          <Option key="lodge" value="lodge">
                            Lodge
                          </Option>
                          <Option key="choultry" value="choultry">
                            Choultry
                          </Option>
                          <Option key="school" value="school">
                            School
                          </Option>
                          <Option key="college" value="college">
                            College
                          </Option>
                          <Option key="commercial" value="commercial">
                            Commercial
                          </Option>
                          <Option key="residential" value="residential">
                            Residential
                          </Option>
                        </Select>
                      </Form.Item>

                      <Form.Item className="checkboxElement">
                        <Checkbox
                          className="check"
                          name="contractor"
                          onChange={this.onCheckboxChange1}
                        >
                          Contractor
                        </Checkbox>
                      </Form.Item>

                      {this.state.checked.contractor ? (
                        <div className="div1">
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.ctrname.length > 0 ? "error" : ""
                              }
                              help={formError.ctrname}
                            >
                              <Input
                                placeholder="Contractor Name"
                                name="ctrname"
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.ctrno.length > 0 ? "error" : ""
                              }
                              help={formError.ctrno}
                            >
                              <Input
                                placeholder="Contractor Phoneno"
                                name="ctrno"
                                prefix={
                                  <Icon
                                    type="phone"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      ) : null}

                      <Form.Item className="checkboxElement">
                        <Checkbox
                          className="check"
                          name="electritian"
                          onChange={this.onCheckboxChange2}
                        >
                          Electritian
                        </Checkbox>
                      </Form.Item>
                      {this.state.checked.electritian ? (
                        <div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.elname.length > 0 ? "error" : ""
                              }
                              help={formError.elname}
                            >
                              <Input
                                placeholder="Electritian Name"
                                name="elname"
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.elno.length > 0 ? "error" : ""
                              }
                              help={formError.elno}
                            >
                              <Input
                                placeholder="Electritian Phoneno"
                                name="elno"
                                prefix={
                                  <Icon
                                    type="phone"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      ) : null}
                      <Form.Item className="checkboxElement">
                        <Checkbox
                          className="check"
                          name="carpenter"
                          onChange={this.onCheckboxChange3}
                        >
                          Carpenter
                        </Checkbox>
                      </Form.Item>
                      {this.state.checked.carpenter ? (
                        <div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.carpname.length > 0 ? "error" : ""
                              }
                              help={formError.carpname}
                            >
                              <Input
                                placeholder="Carpentor Name"
                                name="carpname"
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.carpno.length > 0 ? "error" : ""
                              }
                              help={formError.carpno}
                            >
                              <Input
                                placeholder="Carpenter Phoneno"
                                name="carpno"
                                prefix={
                                  <Icon
                                    type="phone"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      ) : null}
                      <Form.Item className="checkboxElement">
                        <Checkbox
                          className="check"
                          name="painter"
                          onChange={this.onCheckboxChange4}
                        >
                          Painter
                        </Checkbox>
                      </Form.Item>
                      {this.state.checked.painter ? (
                        <div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.pantrname.length > 0 ? "error" : ""
                              }
                              help={formError.pantrname}
                            >
                              <Input
                                placeholder="Painter Name"
                                name="pantrname"
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.pantrno.length > 0 ? "error" : ""
                              }
                              help={formError.pantrno}
                            >
                              <Input
                                placeholder="Painter Phoneno"
                                name="pantrno"
                                prefix={
                                  <Icon
                                    type="phone"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      ) : null}
                      <Form.Item className="checkboxElement">
                        <Checkbox
                          className="check"
                          name="plumber"
                          onChange={this.onCheckboxChange5}
                        >
                          Plumber
                        </Checkbox>
                      </Form.Item>
                      {this.state.checked.plumber ? (
                        <div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.plumname.length > 0 ? "error" : ""
                              }
                              help={formError.plumname}
                            >
                              <Input
                                placeholder="Plumber Name"
                                name="plumname"
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.plumno.length > 0 ? "error" : ""
                              }
                              help={formError.plumno}
                            >
                              <Input
                                placeholder="Plumber Phoneno"
                                name="plumno"
                                prefix={
                                  <Icon
                                    type="phone"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      ) : null}
                      <Form.Item className="checkboxElement">
                        <Checkbox
                          className="check"
                          name="interior"
                          onChange={this.onCheckboxChange6}
                        >
                          Interior Designer
                        </Checkbox>
                      </Form.Item>
                      {this.state.checked.interior ? (
                        <div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.intname.length > 0 ? "error" : ""
                              }
                              help={formError.intname}
                            >
                              <Input
                                placeholder="Interior Name"
                                name="intname"
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.intno.length > 0 ? "error" : ""
                              }
                              help={formError.intno}
                            >
                              <Input
                                placeholder="Interior Phoneno"
                                name="intno"
                                prefix={
                                  <Icon
                                    type="phone"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      ) : null}
                      <Form.Item className="checkboxElement">
                        <Checkbox
                          className="check"
                          name="fabricator"
                          onChange={this.onCheckboxChange7}
                        >
                          Fabricator
                        </Checkbox>
                      </Form.Item>
                      {this.state.checked.fabricator ? (
                        <div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.fabrname.length > 0 ? "error" : ""
                              }
                              help={formError.fabrname}
                            >
                              <Input
                                placeholder="Fabricator Name"
                                name="fabrname"
                                prefix={
                                  <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                          <div>
                            <Form.Item
                              className="checkSub"
                              hasFeedback
                              validateStatus={
                                formError.fabrino.length > 0 ? "error" : ""
                              }
                              help={formError.fabrino}
                            >
                              <Input
                                placeholder="Fabricator Phoneno"
                                name="fabrino"
                                prefix={
                                  <Icon
                                    type="phone"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                  />
                                }
                                onChange={event => this.onInputChange(event)}
                              />
                            </Form.Item>
                          </div>
                        </div>
                      ) : null}
                      <Form.Item className="formElement">
                        <Button
                          onClick={this.onvisitorButtonClickHandler}
                          htmlType="submit"
                          block
                          style={{
                            backgroundColor: "#2BBBAD",
                            color: "#FFF",
                            fontSize: "18px"
                          }}
                        >
                          Add Visitors
                          <Icon type="user-add" style={{ marginLeft: "3%" }} />
                        </Button>
                      </Form.Item>
                    </form>
                  </Col>
                </Row>
              </Content>
            </MDBContainer>

            <Row>
              <Col>
                <FooterComponent />
              </Col>
            </Row>
          </Layout>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    isError: state.auth.error,
    isLoading: state.auth.loading,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: userData => dispatch(action.loginAction(userData)),
    onSetAuthRedirectPath: () =>
      dispatch(action.setAuthRedirectPath("/dashboard"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(dashboardComponent);
