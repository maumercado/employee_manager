import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import {
    EMPLOYEE_UPDATE,
    EMPLOYEE_CREATED,
    EMPLOYEES_FETCH_SUCCESS,
    EMPLOYEE_EDITED
} from "./types";

export const employeeUpdate = ({ prop, value }) => {
    return {
        type: EMPLOYEE_UPDATE,
        payload: { prop, value }
    };
};

export const employeeCreate = ({ name, phone, shift = "Monday" }) => {
    return async dispatch => {
        try {
            const { currentUser } = firebase.auth();
            await firebase
                .database()
                .ref(`/users/${currentUser.uid}/employees`)
                .push({ name, phone, shift });

            dispatch({ type: EMPLOYEE_CREATED });
            Actions.popTo("employeeList");
        } catch (err) {}
    };
};

export const employeesFetch = () => {
    return async dispatch => {
        const { currentUser } = firebase.auth();
        await firebase
            .database()
            .ref(`/users/${currentUser.uid}/employees`)
            .on("value", snapshot => {
                dispatch({ type: EMPLOYEES_FETCH_SUCCESS, payload: snapshot.val() });
            });
    };
};

export const employeeSave = ({ name, phone, shift, uid }) => {
    return async dispatch => {
        try {
            const { currentUser } = firebase.auth();
            await firebase
                .database()
                .ref(`/users/${currentUser.uid}/employees/${uid}`)
                .set({ name, phone, shift });

            dispatch({ type: EMPLOYEE_EDITED });
            Actions.popTo("employeeList");
        } catch (err) {}
    };
};
