import * as ActionType from "../ActionType"

export const incrementcounter = () => (dispatch) => {
    dispatch({type: ActionType.INCREMENT_COUNTER})
}

export const decrementcounter = () => (dispatch) => {
    dispatch({type: ActionType.DECREMENT_COUNTER})
}
