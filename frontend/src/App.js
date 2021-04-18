import React from 'react';

/** Styles */
import { Container, Row } from 'react-bootstrap';

/** Components */
import Footer from './components/Footer';
import Header from './components/Header';

const App = () => {
    return (
        <>
            <Header />

            <main>
                <Container className='py-3'>
                    <Row className='justify-content-center'>
                        <h1>Welcome to Happy Shopping</h1>
                    </Row>
                </Container>
            </main>

            <Footer />
        </>
    );
}

export default App;
