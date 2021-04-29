import React, { useState, useEffect } from 'react';
import axios from 'axios';

/** Bootstrap */
import { Row, Col } from 'react-bootstrap';

/** Data */
// import products from '../products';

/** Components */
import Product from '../components/Product';

const HomeScreen = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const getProducts = async () => {
            const { data } = await axios.get('/api/products');
            // console.log('products: ', products);
            setProducts(data);
        }
        getProducts();
    }, [])

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
