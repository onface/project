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
                <Table
                    columns={[
                        {
                            title: '标题',
                            key: 'title'
                        },
                        {
                            title: '时间',
                            key: 'date'
                        },
                        {
                            title: '操作',
                            key: 'action',
                            render: (msg, item) => (
                                <Button type="danger" onClick={() => self.props.delete(item.id) } >彻底删除</Button>
                            )
                        }
                    ]}
                    data={self.props.dustbin}
                />
            </div>
        )
    }
}
export default Home;
