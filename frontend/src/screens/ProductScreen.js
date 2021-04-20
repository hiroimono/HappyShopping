import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Image, ListGroup, Card, Button } from 'react-bootstrap';
import products from '../products';

/** Components */
import Ratings from '../components/Ratings';

const ProductScreen = ({ match }) => {
    const product = products.find(product => product._id === match.params.id);

    return (
        <>
            <Link to='/' className='btn btn-dark'>Go Back</Link>
            <Row className='my-3'>

                <Col md={6}>
                    <Image src={product.image} fluid />
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h3>{product.name}</h3>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Ratings rating={product.rating} numReviews={product.numReviews} color='gold'></Ratings>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price: ${product.price && product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Descripton: {product.description && product.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>

                <Col md={3}>
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