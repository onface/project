import React , { Component } from "react"
import { Link, Route, BrowserRouter as Router} from 'react-router-dom'
class NotFound extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {

        }
    }
    render() {
        const self = this
        return (
            <div>
                Not found
               <Link to="/" >Home</Link>
            </div>
        )
    }
}
export default NotFound
