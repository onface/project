import ReactDOM from "react-dom"
import App from "./app.js"
require.ensure([], function (require) {
    require('./log.js')
})
ReactDOM.render(
    <App />,
    document.getElementById('app')
)
