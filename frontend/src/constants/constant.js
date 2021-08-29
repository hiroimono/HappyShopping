export const constants = {
    // Products action types
    PRODUCT_LIST_REQUEST: 'PRODUCT_LIST_REQUEST',
    PRODUCT_LIST_SUCCESS: 'PRODUCT_LIST_SUCCESS',
    PRODUCT_LIST_FAILED: 'PRODUCT_LIST_FAILED',

    // Product Detail action types
    SINGLE_PRODUCT_REQUEST: 'SINGLE_PRODUCT_REQUEST',
    SINGLE_PRODUCT_SUCCESS: 'SINGLE_PRODUCT_SUCCESS',
    SINGLE_PRODUCT_FAILED: 'SINGLE_PRODUCT_FAILED',

    // Cart action types
    CART_ADD_ITEM: 'CART_ADD_ITEM',
    CART_REMOVE_ITEM: 'CART_REMOVE_ITEM',

    // User action types (Register, Login, Update Profile)
    /* REGISTER */
    USER_REGISTER_REQUEST: 'USER_REGISTER_REQUEST',
    USER_REGISTER_SUCCESS: 'USER_REGISTER_SUCCESS',
    USER_REGISTER_FAILED: 'USER_REGISTER_FAILED',
    REMOVE_USER_REGISTER_ERRORS: 'REMOVE_USER_REGISTER_ERRORS',

    /* LOGIN */
    USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST ',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAILED: 'USER_LOGIN_FAILED',
    USER_LOGOUT: 'USER_LOGOUT',

    /* PROFLE UPDATE */
    USER_PROFILE_UPDATE_REQUEST: 'USER_PROFILE_UPDATE_REQUEST',
    USER_PROFILE_UPDATE_SUCCESS: 'USER_PROFILE_UPDATE_SUCCESS',
    USER_PROFILE_UPDATE_FAILED: 'USER_PROFILE_UPDATE_FAILED',

    /* GET USER DETAILS */
    USER_DETAILS_REQUEST: 'USER_DETAILS_REQUEST',
    USER_DETAILS_SUCCESS: 'USER_DETAILS_SUCCESS',
    USER_DETAILS_FAIL: 'USER_DETAILS_FAIL',
    USER_DETAILS_RESET: 'USER_DETAILS_RESET',

    /** SAVE USER SHIPPPING ADDRESS */
    CART_SAVE_USER_SHIPPING_ADDRESS: 'CART_SAVE_USER_SHIPPING_ADDRESS',

    /** SAVE USER PAYMENT METHOD */
    CART_SAVE_USER_PAYMENT_METHOD: 'CART_SAVE_USER_PAYMENT_METHOD',

    /** SAVE ORDER */
    ORDER_CREATE_REQUEST: 'ORDER_CREATE_REQUEST',
    ORDER_CREATE_SUCCESS: 'ORDER_CREATE_SUCCESS',
    ORDER_CREATE_FAIL: 'ORDER_CREATE_FAIL',

    /** GET ORDER BY ID */
    ORDER_DETAILS_BY_ID_REQUEST: 'ORDER_DETAILS_BY_ID_REQUEST',
    ORDER_DETAILS_BY_ID_SUCCESS: 'ORDER_DETAILS_BY_ID_SUCCESS',
    ORDER_DETAILS_BY_ID_FAIL: 'ORDER_DETAILS_BY_ID_FAIL',

    /** PAY ORDER */
    ORDER_PAY_REQUEST: 'ORDER_PAY_REQUEST',
    ORDER_PAY_SUCCESS: 'ORDER_PAY_SUCCESS',
    ORDER_PAY_FAIL: 'ORDER_PAY_FAIL',
    ORDER_PAY_RESET: 'ORDER_PAY_RESET',

    /** get paypal-client-id */
    PAYPAL_CLIENT_ID_REQUEST: 'PAYPAL_CLIENT_ID_REQUEST',
    PAYPAL_CLIENT_ID_SUCCESS: 'PAYPAL_CLIENT_ID_SUCCESS',
    PAYPAL_CLIENT_ID_FAIL: 'PAYPAL_CLIENT_ID_FAIL',
}