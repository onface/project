import { combineReducers } from "redux"
import extend from "safe-extend"
import Calling from "calling"
export default function (state = [], action) {
    state = extend.clone(state)
    let payload = action.payload
    let c = new Calling({
        getValue: function () { return {state: state} },
        subscribe: function (data) { state = data.state }
    })
    switch (action.type) {
        case 'MOVE_TO_DUSTBIN':
            c.push('state', payload.data)
        break
        case 'dustbin:DELETE':
            c.delete(`state[{id:"${payload.id}"}]`)
        break
    }
    return state
}
