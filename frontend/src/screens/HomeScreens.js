import React from 'react';
import { Row, Col } from 'react-bootstrap';

/** Data */
import products from '../products';

/** Components */
import Product from '../components/Product';

const HomeScreen = () => {
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map(product => (
                    <Col key={product._id} xs={12} md={6} lg={4}>
                        <Product product={product}></Product>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default HomeScreen
