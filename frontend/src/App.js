import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

/** Styles */
import { Container } from 'react-bootstrap';

/** Components */
import Footer from './components/Footer';
import Header from './components/Header';
import HomeScreen from './screens/HomeScreens';
import ProductScreen from './screens/ProductScreen';
import Login from './screens/Login';
import ShoppingCart from './screens/ShoppingCart';

const App = () => {
    return (
        <Router>
            <Header />

            <main>
                <Container className='py-3'>
                    <Route path='/' component={HomeScreen} exact />
                    <Route path='/login' component={Login} />
                    <Route path='/cart' component={ShoppingCart} />
                    <Route path='/products/:id' component={ProductScreen} />
                </Container>
            </main>

            <Footer />
        </Router>
    );
}

export default App;
