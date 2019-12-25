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
import "./reportComponent.css";
import axios from "../../axiosInterceptor";
import { saveAs } from "file-saver";
import { MDBContainer, MDBBtn } from "mdbreact";
import FooterComponent from "../footerComponent/footerComponent";

const { Content } = Layout;

class reportComponent extends Component {
  _isMounted = false;
  state = {
    selectedRows: [],
    tableData: []
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
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  onExportReport = () => {
    axios
      .get("/exportData", { responseType: "blob" })
      .then(res => {
        saveAs(res.data, "MbiotechVisitors.xlsx");
      })
      .catch(error => {
        console.log(error);
      });
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
            <MDBContainer
              className="text-center mt-5"
              style={{
                backgroundColor: "#FFF",
                paddingBottom: "5%",
                height: "100vh"
              }}
            >
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
                    sm={{ span: 12, offset: 3 }}
                    md={{ span: 24, offset: 1 }}
                  >
                    {/* 
                    <MDBBtn
                      style={{ cursor: "pointer" }}
                      onClick={this.onExportReport}
                    >
                      Export
                    </MDBBtn> */}
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

export default connect(mapStateToProps)(reportComponent);
