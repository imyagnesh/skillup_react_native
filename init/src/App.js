import React, { Component } from "react";

export default class App extends Component {
  state = {
    selectedIndex: -1,
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="rating">
        {[...Array(5).keys()].map((x) => (
          <span
            key={x}
            className={x <= selectedIndex ? "active" : ""}
            onClick={() => this.setState({ selectedIndex: x })}
          >
            *
          </span>
        ))}
      </div>
    );
  }
}
