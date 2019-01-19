import { connect } from "react-redux"
import App from "./app"
import props from "./props"
export default connect(props.mapStateToProps, props.mapDispatchToProps)(App)
