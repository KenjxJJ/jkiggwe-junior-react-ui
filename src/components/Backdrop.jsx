import React, { Component } from "react";
import "./Backdrop.css";

class BackdropComponent extends Component {
 
  render() {
    return this.props.show ? <div className="backdrop" onClick={this.props.clicked}></div> : null;
  }
}

export default BackdropComponent;

