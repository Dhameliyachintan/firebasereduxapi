
import { deletedoctordata, getdoctordata, postdoctordata, putdoctordata } from "../../commene/api/doctor.api";
import { BASE_URL } from "../../Share/baseurl";
import * as ActionType from "../ActionType"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { async } from "@firebase/util";


// getMedicines
export const getDoctor = (data) => async (dispatch) => {
    console.log("asdaasdasdasdasd");
    dispatch(loadingdoctor())
    try {
        let data = []

        const querySnapshot = await getDocs(collection(db, "doctor"));
        querySnapshot.forEach((doc) => {
            data.push({ id: doc.id, ...doc.data() })
        })


        dispatch({ type: ActionType.GET_DOCTOR, payload: data })

    } catch (error) {
        dispatch(errordoctor(error))
        console.log(error);
    }
}

// addmedicinedata
export const adddoctordata = (data) => async (dispatch) => {
    console.log(data);
    dispatch(loadingdoctor())
    try {
        const docRef = await addDoc(collection(db, "doctor"), data);
        console.log("Document written with ID: ", docRef.id);
        dispatch({ type: ActionType.ADD_DOCTOR, payload: { id: docRef.id, ...data } })
    } catch (error) {
        dispatch(errordoctor(error.message))
        console.error("Error adding document: ", error);
    }
}

// updatemedicine

export const updatedoctor = (data) => async (dispatch) => {
    console.log(data);
    try {
        dispatch(loadingdoctor())
        const washingtonRef = doc(db, "doctor", data.id);

        // Set the "capital" field of the city 'DC'
        await updateDoc(washingtonRef, {
            name : data.name,
            expiry : data.expiry,
            price : data.price,
            quantity : data.quantity
        });
        dispatch({ type: ActionType.UPDATAS_DOCTOR, payload: data })

    } catch (error) {
        dispatch(errordoctor(error.message));
    }
}

// Deletemedicine

export const Deletedoctor = (id) => async (dispatch) => {
    try {
        dispatch(loadingdoctor())
        await deleteDoc(doc(db, "doctor", id));
        dispatch({ type: ActionType.REMOVE_DOCTOR, payload: id })
    }
    catch (error) {
        dispatch(errordoctor(error.message))
    }
}



export const loadingdoctor = () => (dispatch) => {
    dispatch({ type: ActionType.LOADING_DOCTOR })
}

export const errordoctor = (error) => (dispatch) => {
    dispatch({ type: ActionType.DOCTOR_ERROES, payload: error })
} 