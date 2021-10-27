import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

/** Styles */
import { Container } from 'react-bootstrap';

/** Components */
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreens';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import PlaceOrdersScreen from './screens/PlaceOrdersScreen';
import OrdersScreen from './screens/OrdersScreen';
import MyOrdersScreen from './screens/MyOrdersScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import AdminUserListScreen from './screens/AdminUserListScreen';
import AdminUserEditScreen from './screens/AdminUserEditScreen';
import AdminProductListScreen from './screens/AdminProductListScreen';
import AdminOrderListScreen from './screens/AdminOrderListScreen';
import AdminProductEditScreen from './screens/AdminProductEditScreen';
import AdminAddNewProductScreen from './screens/AdminAddNewProductScreen';

const App = () => {
    return (
        <Router>
            <Header />

            <main id='main' style={{ paddingTop: '56px' }}>
                <Container className='py-3'>
                    <Route path='/' component={HomeScreen} exact />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/placeorder' component={PlaceOrdersScreen} />
                    <Route path='/my-orders' component={MyOrdersScreen} />
                    <Route path='/orders/:id' component={OrdersScreen} />
                    <Route path='/shipping' component={ShippingScreen} />
                    <Route path='/payment-method' component={PaymentMethodScreen} />
                    <Route path='/products/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/admin/userlist' component={AdminUserListScreen} />
                    <Route path='/admin/useredit/:id/edit' component={AdminUserEditScreen} />
                    <Route path='/admin/productlist' component={AdminProductListScreen} />
                    <Route path='/admin/orderlist' component={AdminOrderListScreen} />
                    <Route path='/admin/productedit/:id/edit' component={AdminProductEditScreen} />
                    <Route path='/admin/product/add' component={AdminAddNewProductScreen} />
                </Container>
            </main>

            <Footer />
        </Router>
    );
}

export default App;
