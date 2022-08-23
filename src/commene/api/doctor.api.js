import { deleteRequest, getRequest, postRequest, putRequest } from "./request"

// getdoctordata

export const getdoctordata = () => {
    return getRequest('doctor')
}

// adddoctordata

export const postdoctordata = (data) => {
    return postRequest('doctor', data)
}

// deletedata

export const deletedoctordata = (id) => {
    return deleteRequest ('doctor/', id)
}

// // updatedata

export const putdoctordata = (data) => {              
    return putRequest('doctor/', data)
}