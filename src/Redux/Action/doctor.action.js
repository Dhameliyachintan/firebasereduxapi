
import { deletedoctordata, getdoctordata, postdoctordata, putdoctordata } from "../../commene/api/doctor.api";
import { BASE_URL } from "../../Share/baseurl";
import * as ActionType from "../ActionType"
import { collection, addDoc } from "firebase/firestore"; 
import { db } from "../../Firebase";


// getMedicines
export const getDoctor = () => (dispatch) => {
    console.log("asdaasdasdasdasd");
    try {

        getdoctordata()
            .then((data) => dispatch({ type: ActionType.GET_DOCTOR, payload: data.data }))

    } catch (error) {
        dispatch(errordoctor(error))
        console.log(error);
    }
}

// addmedicinedata
export const adddoctordata = (data) => async (dispatch) => {
    console.log(data);
    try {
        const docRef = await addDoc(collection(db, "doctor"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({type : ActionType.ADD_DOCTOR, payload : {id : docRef.id, ...data}})
    } catch (error) {
        dispatch(errordoctor(error.message))
        console.error("Error adding document: ", error);
    }
}

// updatemedicine

export const updatedoctor = (data) => (dispatch) => {
    console.log(data);
    try {
        putdoctordata(data)
            .then((data) => dispatch({ type: ActionType.UPDATAS_DOCTOR, payload: data.data }))
            .catch((error) => dispatch(errordoctor(error.message)))
        dispatch(loadingdoctor())

    } catch (error) {
        dispatch(errordoctor(error.message));
    }
}

// Deletemedicine

export const Deletedoctor = (id) => (dispatch) => {
    try {
        dispatch(loadingdoctor())
        deletedoctordata(id)
            .then(dispatch({ type: ActionType.REMOVE_DOCTOR, payload: id }))
            .catch((error) => dispatch(errordoctor(error.message)))

    } catch (error) {
        dispatch(errordoctor(error.message))
    }
}



export const loadingdoctor = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_DOCTOR })
}

export const errordoctor = (error) => (dispatch) => {
    dispatch({ type: ActionType.DOCTOR_ERROES, payload: error })
} 