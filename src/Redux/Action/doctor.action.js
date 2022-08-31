
import { deletedoctordata, getdoctordata, postdoctordata, putdoctordata } from "../../commene/api/doctor.api";
import { BASE_URL } from "../../Share/baseurl";
import * as ActionType from "../ActionType"
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc, } from "firebase/firestore";
import { db, storage } from "../../Firebase";
import { async } from "@firebase/util";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";


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
    // dispatch(loadingdoctor())
    try {
        let rendomStr = Math.floor(Math.random() * 1000000).toString();
        const doctorRef = ref(storage, 'doctor/' + rendomStr);

        uploadBytes(doctorRef, data.file)
            .then((snapshot) => {
                getDownloadURL(snapshot.ref)
                    .then(async (url) => {
                        const docRef = await addDoc(collection(db, "doctor"),
                            {
                                name: data.name,
                                expiry: data.expiry,
                                price: data.price,
                                quantity: data.quantity,
                                url: url,
                                fileName: rendomStr
                            }
                        );
                        // console.log("Document written with ID: ", docRef.id);
                        dispatch({
                            type: ActionType.ADD_DOCTOR, payload: {
                                id: docRef.id,
                                name: data.name,
                                expiry: data.expiry,
                                price: data.price,
                                quantity: data.quantity,
                                url: url,
                                fileName: rendomStr
                            }
                        })
                    })
                // console.log('Uploaded a blob or file!');
            });

        // const docRef = await addDoc(collection(db, "doctor"), data);
        // console.log("Document written with ID: ", docRef.id);
        // dispatch({ type: ActionType.ADD_DOCTOR, payload: { id: docRef.id, ...data } })
    } catch (error) {
        dispatch(errordoctor(error.message))
        console.error("Error adding document: ", error);
    }
}

// updatemedicine

export const updatedoctor = (data) => async (dispatch) => {
    console.log(data);
    try {
        const doctorRefedit = doc(db, "doctor", data.id);
        // dispatch(loadingdoctor())
        if (typeof data.file === "string") {
            // console.log("only data");

            // Set the "capital" field of the city 'DC'
            await updateDoc(doctorRefedit, {
                name: data.name,
                expiry: data.expiry,
                price: data.price,
                quantity: data.quantity,
                url: data.url
            });
            dispatch({ type: ActionType.UPDATAS_DOCTOR, payload: data })

        } else {
            // console.log("image with");
            const doctorRefdel = ref(storage, 'doctor/' + data.fileName);

            // Delete the file
            deleteObject(doctorRefdel).then(async () => {
                let rendomStr = Math.floor(Math.random() * 1000000).toString();
                const doctorRef = ref(storage, 'doctor/' + rendomStr);

                uploadBytes(doctorRef, data.file)
                    .then((snapshot) => {
                        getDownloadURL(snapshot.ref)
                            .then(async (url) => {
                                // console.log("Document written with ID: ", docRef.id);
                                await updateDoc(doctorRefedit, {
                                    name: data.name,
                                    expiry: data.expiry,
                                    price: data.price,
                                    quantity: data.quantity,
                                    url: url,
                                    fileName: rendomStr
                                });
                                dispatch({ type: ActionType.UPDATAS_DOCTOR, payload: { ...data, fileName: rendomStr, url: url, } })
                            })
                    }
                    )
            })
        }

    } catch (error) {
        dispatch(errordoctor(error.message));
    }
}

// Deletemedicine

export const Deletedoctor = (data) => async (dispatch) => {
    try {
        const desertRef = ref(storage, 'doctor/' + data.fileName);

        // Delete the file
        deleteObject(desertRef).then(async () => {
            dispatch(loadingdoctor())
            await deleteDoc(doc(db, "doctor", data.id));
            dispatch({ type: ActionType.REMOVE_DOCTOR, payload: data.id })
        }).catch((error) => {
            dispatch(errordoctor(error.message))
        });
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