import React from "react";
import { Chart, Area, Legend, Axis } from "@qcharts/react";

class AreaChart extends React.Component {
  static componentInfo = {
    title: "面积图",
    desc: "来自 @qcharts/react",
    dependencies: ["spritejs", "@qcharts/core", "@qcharts/react"]
  };

  static defaultProps = {
    data: [
      { product: "茶叶", year: "2016", sales: 81.2 },
      { product: "茶叶", year: "2017", sales: 121.2 },
      { product: "茶叶", year: "2018", sales: 41.2 },
      { product: "牛奶", year: "2016", sales: 89.2 },
      { product: "牛奶", year: "2017", sales: 79.6 },
      { product: "牛奶", year: "2018", sales: 60.2 },
      { product: "咖啡", year: "2016", sales: 35.2 },
      { product: "咖啡", year: "2017", sales: 79.6 },
      { product: "咖啡", year: "2018", sales: 61.2 },
      { product: "椰汁", year: "2016", sales: 35.2 },
      { product: "椰汁", year: "2017", sales: 79.6 },
      { product: "椰汁", year: "2018", sales: 21.2 }
    ],
    dataFields: { row: "year", value: "sales", text: "product" },
    size: ["100%", 200],
    forceFit: true
  };

  render() {
    const {
      data = [],
      dataFields = {},
      size = [0, 0],
      forceFit = true
    } = this.props;

    return (
      <Chart
        data={data}
        dataFields={dataFields}
        size={size}
        forceFit={forceFit}
      >
        <Area />
        <Axis />
        <Axis orient={"left"} />
      </Chart>
    );
  }
}

export { AreaChart as Area };
