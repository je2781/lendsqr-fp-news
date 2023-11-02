import AsyncStorage from "@react-native-async-storage/async-storage"
import authActions from './auth-slice';
import { Dispatch } from "@reduxjs/toolkit";

export function authenticateUser(token: string){
    return (dispatch: Dispatch) => {
        AsyncStorage.setItem('token', token).then((_) => {
            dispatch(authActions.authenticate({
                token: token
            }));
        });
    };
}

export function logoutUser(){
    return (dispatch: Dispatch) => {
        AsyncStorage.removeItem('token').then((_) => {
            dispatch(authActions.logout({}));
        });
    };
}