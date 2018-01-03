import React from "react";

class ExampleReact extends React.Component {
  render() {
    return (
      <div>ExampleReact</div>
    )
  }
}

module.exports = require('react-hot-loader').hot(module)(ExampleReact);
