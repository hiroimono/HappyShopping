const localStorageData = {
    cartItemsFromLocalStorage: localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [],
    userInfoFromLocalStorage: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
    userAsGuestInfoFromLocalStorage: localStorage.getItem('userAsGuestInfo') ? JSON.parse(localStorage.getItem('userAsGuestInfo')) : null,
    shippingAddressFromLocalStorage: localStorage.getItem('shippingAddress') ? JSON.parse(localStorage.getItem('shippingAddress')) : null,
}

const setLocal = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
}

export { localStorageData, setLocal }