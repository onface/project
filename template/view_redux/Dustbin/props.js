export default {
    mapStateToProps: function (state) {
        return {
            dustbin: state.dustbin
        }
    },
    mapDispatchToProps: function(dispatch) {
        return {
            delete: function (id) {
                dispatch({
                    type: 'dustbin:DELETE',
                    payload: {
                        id
                    }
                })
            }
        }
    }
}
