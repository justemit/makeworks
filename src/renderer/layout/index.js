import React from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Layout, Menu, Icon } from "antd";
import { routes } from "../router";
import Logo from "../assets/logo.png";
import "./style.scss";

const { Sider } = Layout;

export const { Provider, Consumer } = React.createContext({
  collapsed: true,
  onCollapse: () => {}
});

class Container extends React.Component {
  state = {
    collapsed: true
  };

  onCollapse = collapsed => {
    this.setState({ collapsed });
  };

  componentDidMount() {
    window.addEventListener(
      "keydown",
      e => {
        const keyCode = e.keyCode || e.which || e.charCode;
        const ctrlKey = e.ctrlKey || e.metaKey;
        if (ctrlKey && keyCode == 66) {
          this.onCollapse(!this.state.collapsed);
        }
      },
      false
    );
  }

  render() {
    const { history } = this.props;
    const pathname = history.location.pathname;

    return (
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          // collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo">
            <img src={Logo} alt="logo" />
            <h1>Makeworks</h1>
          </div>
          <Menu selectedKeys={[pathname]} mode="inline">
            {routes.map(route => (
              <Menu.Item key={route.path}>
                <NavLink to={route.path}>
                  <Icon type={route.icon} />
                  <span>{route.title}</span>
                </NavLink>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Provider
            value={{
              collapsed: this.state.collapsed,
              onCollapse: this.onCollapse
            }}
          >
            {this.props.children}
          </Provider>
        </Layout>
      </Layout>
    );
  }
}

export default withRouter(Container);
