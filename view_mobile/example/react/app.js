import React , { Component } from "react"
import s from "./index-m.less"
class App extends Component {
    constructor (props) {
        super(props)
        const self = this
    }
    render() {
        const self = this
        return (
            <div className={s.reactNode}>react node</div>
        )
    }
}
App = require('react-hot-loader').hot(module)(App)
export default App
