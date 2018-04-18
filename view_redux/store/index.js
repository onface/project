import { createStore, combineReducers, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension'
import ReduxThunk from 'redux-thunk'
import preloadedState from "./preloadedState"
const reducers = combineReducers({
    $view: require('./$view/index').default,
    user: require('./user/index').default,
    inbox: require('./inbox/index').default,
    dustbin: require('./dustbin/index').default,
})

const store = createStore(
    reducers,
    preloadedState,
    composeWithDevTools(
        applyMiddleware(ReduxThunk)
    )
)
export default store
