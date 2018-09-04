import React , { Component } from "react"
import { Link, Route, HashRouter } from 'react-router-dom'
import Button from "button.react"
const { ButtonGroup } = Button
import Icon from "icon.react"
class Nav extends Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {

        }
    }
    render() {
        const self = this
        return (
            <div style={{marginBottom: 10}}>
                <ButtonGroup>
                <Button type={self.props.location.pathname === '/'?'primary':''} prepend={(<Icon type="inbox" />)}
                    onClick={() => {
                        self.props.history.push('/')
                    }}
                 >
                     收件箱
                </Button>
                    <Button type={self.props.location.pathname === '/send'?'primary':''} prepend={(<Icon type="user" />)}
                        onClick={() => {
                            self.props.history.push('/send')
                        }}
                     >
                         发邮件
                    </Button>
                    <Button type={self.props.location.pathname === '/dustbin'?'primary':''} prepend={(<Icon type="delete" />)}
                        onClick={() => {
                            self.props.history.push('/dustbin')
                        }}
                    >
                         垃圾箱
                    </Button>
                </ButtonGroup>
            </div>
        )
    }
}
export default Nav
