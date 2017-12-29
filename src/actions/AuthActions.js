import {
    EMAIL_CHANGED,
    PASSWORD_CHANGED,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILED,
    LOGIN_USER
} from "./types";

import { Actions } from "react-native-router-flux";
import firebase from "firebase";

export const emailChanged = email => {
    return {
        type: EMAIL_CHANGED,
        payload: email
    };
};

export const passwordChanged = password => {
    return {
        type: PASSWORD_CHANGED,
        payload: password
    };
};

const loginUserSuccess = (dispatch, user) => {
    dispatch({ type: LOGIN_USER_SUCCESS, payload: user });

    // takes me to main scene and because employees list is first it will render that one first
    Actions.main();
};

const loginUserFailed = dispatch => {
    dispatch({ type: LOGIN_USER_FAILED });
};

export const loginUser = ({ email, password }) => {
    return async dispatch => {
        try {
            dispatch({ type: LOGIN_USER });
            const user = await firebase.auth().signInWithEmailAndPassword(email, password);
            loginUserSuccess(dispatch, user);
        } catch (err) {
            try {
                const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
                loginUserSuccess(dispatch, user);
            } catch (error) {
                loginUserFailed(dispatch);
            }
        }
    };
};
