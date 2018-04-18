import { Link, HashRouter } from 'react-router-dom'
import Button from "button.react"
const { ButtonGroup } = Button
import Checkbox from "checkbox.react"
import Table from "table.react"
import Icon from "icon.react"
class Home extends React.Component {
    render () {
        const self = this
        return (
            <div style={{padding: 10}} >
                <div style={{marginBottom: 10}}>
                    <ButtonGroup>
                        <Button type="info" prepend={(<Icon type="user" />)}
                            onClick={() => {
                                HashRouter.push('/send')
                            }}
                         >
                             发邮件
                        </Button>
                        <Button type="" prepend={(<Icon type="delete" />)}
                            onClick={() => {
                                HashRouter.push('/dustbin')
                            }}
                        >
                             垃圾箱
                        </Button>
                    </ButtonGroup>
                </div>
                <Table
                    columns={[
                        {
                            title: '已读',
                            key: 'read',
                            width: 40,
                            render: (checked, item) => {
                                return (
                                    <div style={{fontSize: '1.5em'}} >
                                        <Checkbox
                                            checked={checked}
                                            onChange={function(){
                                                self.props.switchRead(item.id)
                                            }}
                                        />
                                    </div>
                                )
                            }
                        },
                        {
                            title: '标题',
                            key: 'title',
                            render:(msg) => (<strong>{msg}</strong>)
                        },
                        {
                            title: '时间',
                            key: 'date'
                        },
                        {
                            title: '操作',
                            key: 'action',
                            render: (msg, item) => (
                                <Button type="danger" onClick={() => self.props.moveToDustbin(item) } >删除</Button>
                            )
                        }
                    ]}
                    data={self.props.inbox}
                />
            </div>
        )
    }
}
export default Home;
