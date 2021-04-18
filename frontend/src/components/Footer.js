import React from 'react';

/** Styles */
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer>
            <Container>
                <Row>
                    <Col className='text-center py-3'>
                        Copyright&copy; HappyShopping
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer
