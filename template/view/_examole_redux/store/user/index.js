import { combineReducers } from "redux"
import extend from "safe-extend"
export default function (state = [], action) {
    state = extend.clone(state)
    let payload = action.payload
    switch (action.type) {
        case '':

        break
    }
    return state
}
