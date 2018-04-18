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
            c.delete(`state[{id:"${payload.data.id}"}]`)
        break
        case 'inbox:NEW_EMAIL':
            c.push('state', payload)
        break
        case 'inbox:SWITCH_READ':
            c.set(
                `state[{id: "${payload.id}"}].read`,
                (value) => !value
            )
        break
    }
    return state
}
