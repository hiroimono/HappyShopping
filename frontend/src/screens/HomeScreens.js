import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'

/** Bootstrap */
import { Row, Col } from 'react-bootstrap';

// actons
import { getProducts } from '../actions/productActions.js'

/** Components */
import Product from '../components/Product';
import Loader from '../components/Loader';

const HomeScreen = () => {
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.productsReducer)

    /** If state is in Basic Version */
    // const { loading, error, products } = useSelector(state => state)

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    return (
        <>
            <h1>Latest Products</h1>

            { loading ?
                <Loader></Loader> :
                error ? <h3>{error}</h3> :
                    <Row>
                        {products.map(product => (
                            <Col key={product._id} xs={12} md={6} lg={4}>
                                <Product product={product}></Product>
                            </Col>
                        ))}
                    </Row>
            }
        </>
    )
}

export default HomeScreen
