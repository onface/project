import React , { Component } from "react"
import { Link, Route, HashRouter, Switch } from 'react-router-dom'
import "../common/index.less"
import { Provider} from "react-redux"
import NotFound from "../NotFound/app"
import store from "../store/index"
import Home from "../Home/index"
class App extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {

        }
    }
    render() {
        const self = this
        return (
            <Provider store={store} >
               <HashRouter >
                    <Switch>
                       <Route exact path="/" component={Home} />
                       <Route component={NotFound} />
                   </Switch>
               </HashRouter>
           </Provider>
        )
    }
}
/*ONFACE-DEL*/App = require('react-hot-loader').hot(module)(App)
export default App
