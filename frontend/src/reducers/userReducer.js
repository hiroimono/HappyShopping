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
        case constants.USER_REGISTER_RESET:
            return {}
        default:
            return state;
    }
}

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_LOGIN_REQUEST:
            return { loading: true }
        case constants.USER_LOGIN_SUCCESS:
            return { loading: false, userInfo: action.payload }
        case constants.USER_LOGIN_FAILED:
            return { loading: false, error: action.payload }
        case constants.USER_LOGIN_RESET:
            return {}
        default:
            return state;
    }
}

export const userProfileUpdateReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_PROFILE_UPDATE_REQUEST:
            return { loading: true }
        case constants.USER_PROFILE_UPDATE_SUCCESS:
            return { success: true, loading: false, users: action.payload }
        case constants.USER_PROFILE_UPDATE_FAILED:
            return { loading: false, error: action.payload }
        case constants.USER_PROFILE_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

export const userDetailsReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case constants.USER_DETAILS_REQUEST:
            return { ...state, loading: true }
        case constants.USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload }
        case constants.USER_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        case constants.USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case constants.USER_LIST_REQUEST:
            return { loading: true }
        case constants.USER_LIST_SUCCESS:
            return { loading: false, users: action.payload }
        case constants.USER_LIST_FAILED:
            return { loading: false, error: action.payload }
        case constants.USER_LIST_RESET:
            return { users: [] }
        default:
            return state
    }
}

export const userDeleteReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_DELETE_REQUEST:
            return { ...state }
        case constants.USER_DELETE_SUCCESS:
            return { success: true, deletedUser: action.payload }
        case constants.USER_DELETE_FAILED:
            return { error: action.payload }
        case constants.USER_DELETE_RESET:
            return { deletedUser: null }
        default:
            return state;
    }
}

export const userEditReducer = (state = {}, action) => {
    switch (action.type) {
        case constants.USER_EDIT_REQUEST:
            return { ...state }
        case constants.USER_EDIT_SUCCESS:
            return { success: true }
        case constants.USER_EDIT_FAIL:
            return { error: action.payload }
        case constants.USER_EDIT_RESET:
            return {}
        default:
            return state
    }
}