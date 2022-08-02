import React, { Component } from "react";
import "./Backdrop.css";

class BackdropComponent extends Component {
  render() {
    return this.props.show ? (
      <div id="backdrop" onClick={this.props.clicked}></div>
    ) : null;
  }
}

export default BackdropComponent;
