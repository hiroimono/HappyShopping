import { constants } from '../constants/constant.js';

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_REGISTER_REQUEST:
            return { ...state, loading: true }
        case constants.USER_REGISTER_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload }
        case constants.USER_REGISTER_FAILED:
            return { ...state, loading: false, error: action.payload }
        case constants.REMOVE_USER_REGISTER_ERRORS:
            return { ...state, error: null }
        case constants.USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_LOGIN_REQUEST:
            return { ...state, loading: true }
        case constants.USER_LOGIN_SUCCESS:
            return { ...state, loading: false, userInfo: action.payload }
        case constants.USER_LOGIN_FAILED:
            return { ...state, loading: false, error: action.payload }
        case constants.USER_LOGOUT:
            return {}
        default:
            return state;
    }
}

export const userProfileUpdateReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case constants.USER_PROFILE_UPDATE_REQUEST:
            return { ...state, loading: true }
        case constants.USER_PROFILE_UPDATE_SUCCESS:
            return { ...state, loading: false, users: action.payload }
        case constants.USER_PROFILE_UPDATE_FAILED:
            return { ...state, loading: false, error: action.payload }
        case constants.USER_PROFILE_UPDATE_RESET:
            return { ...state, user: {} }
        default:
            return state;
    }
}