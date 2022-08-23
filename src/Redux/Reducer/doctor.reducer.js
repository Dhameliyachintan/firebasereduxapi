import * as ActionType from "../ActionType"

const initialState = {
    isLoading: false,
    doctor: [],
    errors: ''
}

export const doctorreducer = (state = initialState, action) => {
    console.log(action.type, action.payload, state);
    switch (action.type) {
        case ActionType.REMOVE_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.filter((d, i) => d.id !== action.payload),
                errors: ''
            };
        case ActionType.UPDATAS_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.map((d) => {
                    if (d.id === action.payload.id) {
                        return action.payload
                    } else {
                        return d;
                    }
                }),
                errors: ''
            };
        case ActionType.LOADING_DOCTOR:
            return {
                ...state,
                isLoading: true,
                errors: ''
            }
        case ActionType.GET_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: action.payload,
                errors: ''
            }
        case ActionType.ADD_DOCTOR:
            return {
                ...state,
                isLoading: false,
                doctor: state.doctor.concat(action.payload),
                errors: ''
            }

        case ActionType.DOCTOR_ERROES:
            return {
                ...state,
                isLoading: false,
                doctor: [],
                errors: action.payload
            }
        default:
            return state
    }
}