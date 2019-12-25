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
  notification,
  DatePicker
} from "antd";
import * as action from "../../stores/actions/index";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import NavigationComponent from "../navigationComponent/navigationComponent";
import "./siteDetailsComponent.css";
import axios from "../../axiosInterceptor";
import { saveAs } from "file-saver";
import { MDBContainer, MDBBtn } from "mdbreact";
import FooterComponent from "../footerComponent/footerComponent";
import validator from "validator";

const { Content } = Layout;
const { RangePicker } = DatePicker;
const dateFormatList = ["YYYY-MM-DD", "YYYY-MM-DD"];

class siteDetailsComponent extends Component {
  _isMounted = false;
  state = {
    selectedRows: [],
    tableData: [],
    userData: [],
    filterData: {
      username: "",
      fromDate: "",
      toDate: ""
    }
  };
  componentDidMount() {
    this._isMounted = true;
    axios
      .get("/visitorData")
      .then(res => {
        if (res.data.success) {
          this.setState({ tableData: res.data.data });
        }
      })
      .catch(error => {
        console.log("er--", error);
      });
    axios
      .get("/users")
      .then(res => {
        if (res.data.success) {
          console.log("res--", res.data.data);
          this.setState({ userData: res.data.data });
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
    let { filterData } = this.state;

    if (
      filterData.username !== "" &&
      filterData.fromDate !== "" &&
      filterData.toDate !== ""
    ) {
      axios
        .post(
          "/exportSiteDetails",
          { filterData: this.state.filterData },
          { responseType: "blob" }
        )
        .then(res => {
          saveAs(res.data, "MbiotechVisitors.xlsx");
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      axios
        .get("/exportData", { responseType: "blob" })
        .then(res => {
          saveAs(res.data, "MbiotechVisitors.xlsx");
        })
        .catch(error => {
          console.log(error);
        });
    }
  };
  deleteRow = text => {
    let tableId = text._id;
    axios
      .put("/visitorDelete", { id: tableId })
      .then(res => {
        console.log("res--", res);
        if (res.data.success) {
          notification.open({
            message: res.data.message,
            duration: 2,
            top: 80
          });
          axios
            .get("/visitorData")
            .then(res => {
              if (res.data.success) {
                this.setState({ tableData: res.data.data });
              } else {
                notification.open({
                  message: res.data.message,
                  duration: 2,
                  top: 80
                });
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

  onSelectChange = value => {
    console.log("value", value);
    let { filterData } = this.state;
    filterData.username = validator.escape(value);
    this.setState({ filterData: filterData });
  };
  onDateChange = (date, dateString) => {
    // console.log(dateString[0], "\n", dateString[1]);
    let { filterData } = this.state;
    filterData.fromDate = validator.escape(dateString[0]);
    filterData.toDate = validator.escape(dateString[1]);
    this.setState({ filterData: filterData });
  };
  onFilterTable = e => {
    e.preventDefault();
    let { filterData } = this.state;
    if (
      filterData.username === "" ||
      filterData.fromDate === "" ||
      filterData.toDate === ""
    ) {
      notification.open({
        message: "Please fill the filter data",
        duration: 2,
        top: 80
      });
    } else {
      axios
        .post("/filterData", { filterData: this.state.filterData })
        .then(res => {
          if (res.data.success) {
            this.setState({ tableData: res.data.data });
          } else {
            notification.open({
              message: res.data.message,
              duration: 2,
              top: 80
            });
          }
        })
        .catch(err => {
          console.log("fil err--", err);
        });
    }
  };
  render() {
    const columns = [
      {
        title: "Executive Name",
        dataIndex: "executiveName",
        key: "executiveName",
        fixed: "left",
        width: 120
      },
      {
        title: "Name",
        dataIndex: "fullname",
        key: "fullname",
        fixed: "left",
        width: 100
        //  render: text => <a>{text}</a>
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "age",
        width: 100
      },
      {
        title: "Address",
        dataIndex: "address",
        key: "address",
        width: 100
      },
      {
        title: "Phone",
        dataIndex: "phoneNo",
        key: "phoneNo",
        width: 100
      },
      {
        title: "Place type",
        dataIndex: "typeOfPlace",
        key: "typeOfPlace",
        width: 150
      },
      {
        title: "ContrName",
        dataIndex: "contractorName",
        key: "contractorName",
        width: 110
      },
      {
        title: "ContrNo",
        dataIndex: "contractorPhoneNo",
        key: "contractorPhoneNo",
        width: 100
      },

      {
        title: "ElectricianName",
        dataIndex: "electricianName",
        key: "electricianName",
        width: 150
      },
      {
        title: "ElectricianNo",
        dataIndex: "electricianNo",
        key: "electricianNo",
        width: 150
      },
      {
        title: "CarpenterName",
        dataIndex: "CarpenterName",
        key: "CarpenterName",
        width: 150
      },
      {
        title: "CarpenterNo",
        dataIndex: "CarpenterNo",
        key: "CarpenterNo",
        width: 150
      },
      {
        title: "PainterName",
        dataIndex: "PainterName",
        key: "PainterName",
        width: 150
      },
      {
        title: "PainterNo",
        dataIndex: "PainterNo",
        key: "PainterNo",
        width: 150
      },
      {
        title: "PlumberName",
        dataIndex: "PlumberName",
        key: "PlumberName",
        width: 150
      },
      {
        title: "PlumberNo",
        dataIndex: "PlumberNo",
        key: "PlumberNo",
        width: 150
      },
      {
        title: "InteriorName",
        dataIndex: "InteriorName",
        key: "InteriorName",
        width: 150
      },
      {
        title: "InteriorNo",
        dataIndex: "InteriorNo",
        key: "InteriorNo",
        width: 150
      },
      {
        title: "FabricatorName",
        dataIndex: "FabricatorName",
        key: "FabricatorName",
        width: 150
      },
      {
        title: "FabricatorNo",
        dataIndex: "FabricatorNo",
        key: "FabricatorNo",
        width: 150
      },

      {
        title: "Latitude",
        dataIndex: "latitude",
        key: "latitude",
        width: 100
      },
      {
        title: "longitude",
        dataIndex: "longitude",
        key: "longitude",
        width: 100
      },
      {
        title: "City",
        dataIndex: "city",
        key: "city",
        width: 100
      },
      {
        title: "Timestamp",
        dataIndex: "timestamp",
        key: "timestamp",
        width: 120
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
              <Content style={{ backgroundColor: "#FFF", marginTop: "13%" }}>
                <Row>
                  <Col
                    xs={{ span: 23, offset: 3 }}
                    sm={{ span: 12, offset: 3 }}
                    md={{ span: 24, offset: 1 }}
                  >
                    <div>
                      <Select
                        placeholder="Select User"
                        style={{
                          width: 120,
                          marginRight: "2%"
                        }}
                        onChange={this.onSelectChange}
                      >
                        {this.state.userData.map(user => (
                          <Select.Option key={user._id} value={user.username}>
                            {user.username}
                          </Select.Option>
                        ))}
                      </Select>
                      <RangePicker
                        style={{
                          marginRight: "2%"
                        }}
                        onChange={this.onDateChange}
                        format={dateFormatList[0]}
                      />
                      <Button
                        type="primary"
                        ghost
                        htmlType="button"
                        style={{
                          color: "#2BBBAD",
                          borderColor: "#2BBBAD",
                          width: 120
                        }}
                        onClick={this.onFilterTable}
                      >
                        Search
                      </Button>
                    </div>
                    <div style={{ marginTop: "4%", marginRight: "2%" }}>
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

export default connect(mapStateToProps)(siteDetailsComponent);
