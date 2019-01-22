import React , { Component } from "react"
import s from "./index.less?modules"
class App extends Component {
    constructor (props) {
        super(props)
        const self = this
    }
    render() {
        const self = this
        return (
            <div className={s.reactNode} onClick={() => {
                console.log('log')
            }} >
                react node
                <img src={require('./onface.png')} width="20" alt=""/>
            </div>
        )
    }
}
/*ONFACE-DEL*/App = require('react-hot-loader').hot(module)(App)
export default App
