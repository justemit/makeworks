import React from "react";
import {
  Row,
  Col,
  Button,
  Icon,
  Tooltip,
  notification,
  Drawer,
  Table,
  Typography
} from "antd";
import { connect } from "react-redux";
import {
  runExec,
  notify,
  EXEC_LOG_STACK,
  clearExecLog
} from "../../../shell/index";

const key = "notify";
const icon = <Icon type="loading" style={{ color: "#ff9f00" }} />;

class Header extends React.Component {
  state = { visible: false };

  toggleVisible = () => {
    this.setState({ visible: !this.state.visible });
  };

  render() {
    const { version, scripts, path } = this.props;

    return (
      <Row className="project-sub-header">
        <Col span={12}>
          <p>
            项目版本号 <strong>{version}</strong>
          </p>
        </Col>
        <Col span={12}>
          <Drawer
            title="运行日志"
            placement="right"
            closable={true}
            onClose={this.toggleVisible}
            visible={this.state.visible}
            width={"100%"}
          >
            <Table
              dataSource={EXEC_LOG_STACK}
              columns={[
                {
                  title: "状态",
                  dataIndex: "status",
                  key: "status"
                },

                {
                  title: "命令",
                  dataIndex: "command",
                  key: "command"
                },

                {
                  title: "输出信息",
                  dataIndex: "info",
                  key: "info"
                },

                {
                  title: "时间",
                  dataIndex: "time",
                  key: "time"
                }
              ]}
            />
          </Drawer>

          <Tooltip title="查看运行日志">
            <Button icon="diff" type="link" onClick={this.toggleVisible}>
              运行日志
            </Button>
          </Tooltip>

          <Tooltip title="执行 npm i 命令">
            <Button
              icon="download"
              type="link"
              onClick={() => {
                const onOk = () => {
                  notification.close(key);
                  notify({ title: `依赖安装完毕`, body: `现在可以运行服务` });
                };

                notification.open({
                  key,
                  message: "正在安装依赖",
                  description: "请耐心等待...",
                  icon,
                  placement: "topRight",
                  duration: 0
                });

                runExec({
                  command: `cd ${path} && npm i`,
                  onExit: onOk,
                  onClose: onOk,
                  onError: e =>
                    notify({
                      title: `依赖安装失败`,
                      body: `错误信息: ${e.message || e}`
                    })
                });
              }}
            >
              安装依赖
            </Button>
          </Tooltip>

          {/* <Tooltip title="更新项目路由">
            <Button
              icon="sync"
              type="link"
              onClick={() => {
                const onOk = () => {
                  notification.close(key);
                  notify({ title: `服务运行成功`, body: `请打开浏览器` });
                };

                notification.open({
                  key,
                  message: "正在运行服务",
                  description: "请耐心等待...",
                  icon,
                  duration: 0
                });

                runExec({
                  command: `cd ${path} && npm run start`,
                  onExit: () => notify({ title: `服务运行成功` }),
                  onError: onOk,
                  onClose: onOk
                });
              }}
            >
              更新路由
            </Button>
          </Tooltip> */}

          <Tooltip title="执行 npm run start 命令">
            <Button
              icon="play-circle"
              type="link"
              onClick={() => {
                const onOk = () => {
                  notification.close(key);
                  notify({ title: `服务运行成功`, body: `请打开浏览器` });
                };

                notification.open({
                  key,
                  message: "正在启动服务",
                  description: "请耐心等待...",
                  icon,
                  placement: "topRight",
                  duration: 0
                });

                runExec({
                  command: `cd ${path} && npm run start`,
                  onExit: () => notify({ title: `服务运行成功` }),
                  onError: onOk,
                  onClose: onOk
                });
              }}
            >
              运行服务
            </Button>
          </Tooltip>

          <Tooltip title="执行 npm run build 命令">
            <Button
              icon="desktop"
              type="link"
              onClick={() => {
                const onOk = () => {
                  notification.close(key);
                  notify({ title: `项目构建完毕` });
                };
                notification.open({
                  key,
                  message: "正在构建项目",
                  description: "请耐心等待...",
                  icon,
                  placement: "topRight",
                  duration: 0
                });
                runExec({
                  command: `cd ${path} && npm i`,
                  onExit: onOk,
                  onClose: onOk,
                  onError: e =>
                    notify({
                      title: `项目构建失败`,
                      body: `错误信息: ${e.message || e}`
                    })
                });
              }}
            >
              构建项目
            </Button>
          </Tooltip>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = state => ({
  ...state.setting
});

export default connect(
  mapStateToProps,
  null
)(Header);
