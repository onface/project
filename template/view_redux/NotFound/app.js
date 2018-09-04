import React , { Component } from "react"
import { Link, Route, BrowserRouter as Router} from 'react-router-dom'
import Button from "button.react"
const { ButtonGroup } = Button
import Icon from "icon.react"
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
               <h2>Not found</h2>
               <Link to="/" >
                   <Button type="info" >
                    Home
                   </Button>
               </Link>
            </div>
        )
    }
}
export default NotFound
