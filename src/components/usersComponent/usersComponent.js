import React, { Component } from "react";
import {
  Layout,
  Row,
  Col,
  Icon,
  Menu,
  Input,
  Select,
  Checkbox,
  Table,
  Divider,
  Tag,
  Pagination,
  Button,
  notification
} from "antd";
import * as action from "../../stores/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NavigationComponent from "../navigationComponent/navigationComponent";
import "./usersComponent.css";
import axios from "../../axiosInterceptor";
import { saveAs } from "file-saver";
import { MDBContainer, MDBBtn } from "mdbreact";
import FooterComponent from "../footerComponent/footerComponent";

const { Content } = Layout;

class usersComponent extends Component {
  _isMounted = false;
  state = {
    selectedRows: [],
    tableData: []
  };
  componentDidMount() {
    this._isMounted = true;
    axios
      .get("/users")
      .then(res => {
        if (res.data.success) {
          this.setState({ tableData: res.data.data });
        }
      })
      .catch(error => {
        console.log("er--", error);
      });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onExportReport = () => {
    axios
      .get("/exportUserData", { responseType: "blob" })
      .then(res => {
        saveAs(res.data, "MbiotechUsers.xlsx");
      })
      .catch(error => {
        console.log(error);
      });
  };
  deleteRow = text => {
    let userId = text._id;
    axios
      .put("/userDelete", { id: userId })
      .then(res => {
        console.log("res--", res);
        if (res.data.success) {
          notification.open({
            message: res.data.message,
            duration: 5,
            top: 80
          });
          axios
            .get("/users")
            .then(res => {
              if (res.data.success) {
                this.setState({ tableData: res.data.data });
              }
            })
            .catch(error => {
              console.log("er-last-", error);
            });
        }
      })
      .catch(err => {
        console.log("err---", err);
      });
  };
  render() {
    const columns = [
      {
        title: "Full Name",
        dataIndex: "username",
        key: "username",
        // fixed: "left",
        width: 150
        //  render: text => <a>{text}</a>
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
        // fixed: "left",
        width: 150
      },
      {
        title: "Phoneno",
        dataIndex: "phoneNo",
        key: "phoneNo",
        width: 100
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 210
      },
      {
        title: "Pincode",
        dataIndex: "pincode",
        key: "pincode",
        width: 100
      },
      {
        title: "Role",
        dataIndex: "role",
        key: "role",
        width: 100
      },
      {
        title: "Action",
        key: "action",
        fixed: "right",
        width: 100,
        render: (text, record) => (
          <span>
            <Button type="link" onClick={() => this.deleteRow(text)}>
              <Icon type="delete" style={{ color: "red" }} />
            </Button>
          </span>
        )
      }
    ];

    if (!this.props.isAuthenticated) {
      return <Redirect to="/" />;
    }

    return (
      <Row>
        <Col span={24}>
          <Layout>
            <NavigationComponent />
            <MDBContainer className="text-center mt-5 containers">
              <Button
                type="primary"
                ghost
                htmlType="button"
                style={{
                  marginTop: "4%",
                  float: "left",
                  marginLeft: "5%",
                  color: "#2BBBAD",
                  borderColor: "#2BBBAD",
                  width: 120
                }}
                onClick={this.onExportReport}
              >
                Export
              </Button>
              <Content style={{ backgroundColor: "#FFF", marginTop: "7%" }}>
                <Row>
                  <Col
                    xs={{ span: 23, offset: 3 }}
                    sm={{ span: 12, offset: 2 }}
                    md={{ span: 24, offset: 1 }}
                  >
                    <div style={{ marginTop: "2%", marginRight: "2%" }}>
                      <Table
                        scroll={{ x: 1300, y: 350 }}
                        rowKey={record => record.email}
                        columns={columns}
                        dataSource={this.state.tableData}
                        pagination
                        bordered
                      />
                    </div>
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
    isAuthenticated: state.auth.token != null
  };
};

export default connect(mapStateToProps)(usersComponent);
