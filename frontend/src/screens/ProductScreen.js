import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import axios from 'axios';
// import products from '../products';

/** Components */
import Ratings from '../components/Ratings';

const ProductScreen = ({ match }) => {
    // const product = products.find(product => product._id === match.params.id);
    const [product, setProduct] = useState({})

    useEffect(() => {
        const getProduct = async () => {
            const { data } = await axios.get(`/api/products/${match.params.id}`);
            console.log('products: ', data);
            setProduct(data);
        }
        getProduct();
    }, [match])

    return (
        <>
            <Link to='/' className='btn btn-dark'>Go Back</Link>
            <Row className='my-3'>

                <Col md={12} lg={6} className="d-flex no-gutter justify-content-center align-items-center mb-3">
                    <Image src={product.image} fluid className="w-100" />
                </Col>

                <Col md={7} lg={4}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item className='px-0'>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item className='px-0'>

                            <Ratings rating={product.rating} numReviews={product.numReviews} color='gold'></Ratings>

                        </ListGroup.Item>

                        <ListGroup.Item className='px-0'>
                            Price: ${product.price && product.price}
                        </ListGroup.Item>

                        <ListGroup.Item className='px-0'>
                            Descripton: {product.description && product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={5} lg={2} className="my-4">
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price: </Col>
                                    <Col><strong>${product.price}</strong></Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>Status: </Col>
                                    <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Button type='button' disabled={product.countInStock <= 0 ? true : false} className="btn btn-block">Add to Cart</Button>
                                </Row>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen;