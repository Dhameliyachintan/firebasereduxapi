import { combineReducers } from "redux";
import { counterReducer } from "./Counter.reducer";
import { doctorreducer } from "./doctor.reducer";

export const rootReducer = combineReducers({
    counter: counterReducer,
    doctordata: doctorreducer,
})