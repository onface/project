import React , { Component } from "react"
import { Link, Route, HashRouter, Switch } from 'react-router-dom'
import "../common/index.less"
import { Provider} from "react-redux"
import NotFound from "../NotFound/app"
import store from "../store/index"
import Home from "../Home/index"
import Nav from "../Nav/index"
import Dustbin from "../Dustbin/index"
import Send from "../Send/index"
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
               <HashRouter>
                    <div>
                        <Route component={Nav} />
                        <Switch>
                           <Route exact path="/" component={Home} />
                           <Route exact path="/send" component={Send} />
                           <Route exact path="/dustbin" component={Dustbin} />
                           <Route component={NotFound} />
                       </Switch>
                   </div>
               </HashRouter>
           </Provider>
        )
    }
}
/*ONFACE-DEL*/App = require('react-hot-loader').hot(module)(App)
export default App
