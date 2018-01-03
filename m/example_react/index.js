import React from "react";

class ExampleReact extends React.Component {
  render() {
    return (
      <div>ExampleReact</div>
    )
  }
}
ExampleReact = require('react-hot-loader').hot(module)(ExampleReact);
module.exports = ExampleReact
