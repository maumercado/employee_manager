import firebase from "firebase";
import { Actions } from "react-native-router-flux";
import { EMPLOYEE_UPDATE, EMPLOYEE_CREATED } from "./types";

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
            Actions.employeeList({ type: "reset" });
        } catch (err) {}
    };
};
