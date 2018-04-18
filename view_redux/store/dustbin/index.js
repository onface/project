import { combineReducers } from "redux"
import extend from "safe-extend"
import Calling from "calling"
export default function (state = [], action) {
    state = extend.clone(state)
    let payload = action.payload
    let c = new Calling({
        getValue: function () { return {data: state} },
        subscribe: function (data) { state = data.data }
    })
    switch (action.type) {
        case 'MOVE_TO_DUSTBIN':
            c.push('data', payload.data)
        break
    }
    return state
}
