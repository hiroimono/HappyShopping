const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userInfoFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const setLocal = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
}

export { cartItemsFromLocalStorage, userInfoFromLocalStorage, setLocal }