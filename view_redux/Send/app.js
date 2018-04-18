import { Link, HashRouter } from 'react-router-dom'
import Button from "button.react"
const { ButtonGroup } = Button
import Checkbox from "checkbox.react"
import Table from "table.react"
import Icon from "icon.react"
import Calling from "calling"
import syncState from "sync-state"
class Home extends React.Component {
    constructor (props) {
        super(props)
        const self = this
        self.state = {
            form: {},
            send:[]
        }
        if (localStorage.getItem('$view:send')) {
            self.state = JSON.parse(localStorage.getItem('$view:send'))
        }
        self.call = new Calling({
            getValue: function () {
                return self.state
            },
            subscribe: function (data, info) {
                self.setState(data)
                localStorage.setItem('$view:send', JSON.stringify(data))
            }
        })

    }
    render () {
        const self = this
        const sync = syncState(this, 'form')
        return (
            <div style={{padding: 10}} >
                <form action="" onSubmit={function (e) {
                    e.preventDefault()
                    self.call.unshift('send', self.state.form)
                }} >
                    <dl>
                        <dt>subject</dt>
                        <dd>
                            <input type="text" {...sync('subject')}  />
                        </dd>
                        <dt>content</dt>
                        <dd>
                            <textarea {...sync('content')}  />
                        </dd>
                        <dd>
                            <Button htmlType="submit">发送</Button>
                        </dd>
                    </dl>
                </form>
                <dl>
                    {self.state.send.map(function (item, index) {
                        return [
                            (<dt key={'id' + index} >{item.subject}</dt>),
                            (<dd key={'id' + index + 'b'} >{item.content}</dd>)
                        ]
                    })}
                </dl>
            </div>
        )
    }
}
export default Home;
