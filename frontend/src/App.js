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
import ProfileScreen from './screens/ProfileScreen'

const App = () => {
    return (
        <Router>
            <Header />

            <main style={{ paddingTop: '56px' }}>
                <Container className='py-3'>
                    <Route path='/' component={HomeScreen} exact />
                    <Route path='/login' component={LoginScreen} />
                    <Route path='/register' component={RegisterScreen} />
                    <Route path='/profile' component={ProfileScreen} />
                    <Route path='/products/:id' component={ProductScreen} />
                    <Route path='/cart/:id?' component={CartScreen} />
                </Container>
            </main>

            <Footer />
        </Router>
    );
}

export default App;
