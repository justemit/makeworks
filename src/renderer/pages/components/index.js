import React from "react";
import { Card, Col, Row, Layout, Button } from "antd";
import * as Components from "../../../resource/components/index";
import "./style.scss";

const { Header, Content } = Layout;

export default class extends React.Component {
  render() {
    return (
      <>
        <Header>
          <h1>组件</h1>
        </Header>
        <Content>
          {Object.keys(Components)
            .reduce((a, c, i) => {
              let index = ~~(i / 3);
              a[index] = a[index] || [];
              a[index].push(c);
              return a;
            }, [])
            .map((components, i) => {
              return (
                <Row gutter={16} key={i}>
                  {components.map(type => {
                    let Target = Components[type];
                    const key = type + "-" + i;
                    const info = Target.componentInfo || { title: undefined };

                    return (
                      <Col span={8} key={key}>
                        <Card
                          key={key}
                          title={info.title}
                          bordered={false}
                          className="component-card"
                        >
                          <Target />
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              );
            })}
        </Content>
      </>
    );
  }
}
