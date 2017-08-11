import { h, Component } from "preact";
import cx from "classnames";
import Prism from "prismjs";

// Import prism plugins
import "prismjs/plugins/line-numbers/prism-line-numbers";
import "prismjs/plugins/line-highlight/prism-line-highlight";

import "./prettyprint.css";

const BASE_CLASS = "pretty-print";

export default class PrettyPrint extends Component {
  constructor(...args) {
    super(...args);
    this.highlight = this.highlight.bind(this);
    this.state = {
      render: true,
      shouldUpdate: false
    };
  }

  componentDidMount() {
    this.highlight();
  }

  componentWillReceiveProps(nextProps) {
    console.log("Received", new Date());
    this.setState({
      render: false,
      shouldUpdate: true
    });
  }

  componentDidUpdate() {
    if (this.state.shouldUpdate) {
      setTimeout(() => {
        console.log("Updated", new Date());
        this.setState(
          {
            render: true,
            shouldUpdate: false
          },
          () => {
            this.highlight();
          }
        );
      }, 0);
    }
  }

  highlight() {
    Prism.highlightElement(this._domNode);
  }

  render({ children, className, dataLine }, { render }) {
    const preProps = {
      className: cx(BASE_CLASS),
      "data-line": dataLine
    };
    const codeProps = {
      className: cx(className),
      ref: ref => (this._domNode = ref)
    };
    // Doing a reset like this is the only way
    // to reset prismjs as the API does not provide a reset function
    if (!render) {
      return null;
    }
    return (
      <pre {...preProps}>
        <code {...codeProps}>
          {children}
        </code>
      </pre>
    );
  }
}
