export default {
    mapStateToProps: function (state) {
        return {
            inbox: state.inbox
        }
    },
    mapDispatchToProps: function(dispatch) {
        return {
            switchRead: function (id) {
                dispatch({
                    type: 'inbox:SWITCH_READ',
                    payload: {
                        id
                    }
                })
            },
            moveToDustbin: function (data) {
                dispatch({
                    type: 'MOVE_TO_DUSTBIN',
                    payload: {
                        data
                    }
                })
            }
        }
    }
}
