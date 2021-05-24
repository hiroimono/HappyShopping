const cartItemsFromLocalStorage = localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [];
const userLoggedInFromLocalStorage = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null;

const setLocal = (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
}

export { cartItemsFromLocalStorage, userLoggedInFromLocalStorage, setLocal }