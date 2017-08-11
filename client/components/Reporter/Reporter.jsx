import { h, Component } from "preact";

import Header from "../Header";
import Sidebar from "../Sidebar";
import Content from "../Content";

import "./reporter.css";

export default class Reporter extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      reportType: "count",
      activeIndex: 0
    };

    this.handleItemChange = this.handleItemChange.bind(this);
  }

  handleItemChange(index) {
    this.setState({
      activeIndex: index
    });
  }

  render({ data }, { reportType, activeIndex }) {
    const sidebarProps = {
      data,
      reportType,
      handleItemChange: this.handleItemChange,
      activeIndex
    };
    const contentProps = {
      data: data[activeIndex],
      reportType
    };
    return (
      <div class="js-cpa">
        <Header />
        <div className="layout">
          <Sidebar {...sidebarProps} />
          <Content {...contentProps} />
        </div>
      </div>
    );
  }
}
