import React from "react";
import s from './index-m.css';
import l from './index-m.less';

class ExampleReact extends React.Component {
  render() {
    return (
    	<div>
		    <div className={s.examplereact} >ExampleReact</div>
		    <div className={l.examplereact} >ExampleReact</div>
	    </div>
    )
  }
}

ExampleReact = require('react-hot-loader').hot(module)(ExampleReact);
module.exports = ExampleReact

