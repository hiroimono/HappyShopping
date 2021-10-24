import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

// bootstrap
import { Row, Col, ListGroup, Card, Button, Form } from 'react-bootstrap';

// actions
import { getSingleProduct } from '../actions/productActions.js'
import { addProductToCart, removeProductFromCart } from '../actions/cartActions.js';

/** Components */
import Ratings from '../components/Ratings';
import Loader from '../components/Loader';
import Message from '../components/Message';
import ImgSlider from '../components/ImgSlider.js';

// Custom Hooks
import useBreakpoint from '../customHooks/useBreakpoint';

/** i18n */
import { useTranslation } from 'react-i18next'

const ProductScreen = ({ history, match }) => {
    const { t } = useTranslation();

    const { width } = useBreakpoint();

    const [qty, setQty] = useState(1);

    const dispatch = useDispatch()
    const { loading, error, product } = useSelector(state => state.product)
    const { cartItems } = useSelector(state => state.cart)
    const { userInfo: user } = useSelector(state => state.userLogin)

    const initial = cartItems.filter(item => item._id === match.params.id).length ? true : false;
    const [isInCart, setIsInCart] = useState(initial);

    /** If state is in Basic Version */
    // const { loading, error, product } = useSelector(state => state)

    useEffect(() => {
        dispatch(getSingleProduct(match.params.id));
    }, [dispatch, match.params.id])

    const addToCartHandler = () => {
        // history.push(`/cart/${match.params.id}?qty=${qty}`);
        dispatch(addProductToCart(match.params.id, qty))
        setIsInCart(true)
    }

    const removeFromCartHandler = () => {
        dispatch(removeProductFromCart(match.params.id));
        setIsInCart(false)
    }

    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)

    console.log('qty: ', qty);
    return (
        <>
            {loading ?
                <Loader /> :
                error ?
                    <Message variant='danger' messageText={error}></Message> :
                    (
                        <>
                            <Link to='/' className='btn btn-dark'>{t('go-back')}</Link>
                            <Row className='my-3'>

                                <Col md={12} lg={5} className="d-flex no-gutter justify-content-center align-items-center my-3" style={width < 576 ? { 'height': '200px' } : { 'height': '400px' }}>
                                    {/* <Image src={product?.image} fluid className="w-100 h-100" style={{ 'objectFit': 'cover' }} /> */}
                                    {product && <ImgSlider productId={product._id} images={product.image} style={{ 'width': '100%', 'height': width < 576 ? '200px' : '400px' }} />}
                                </Col>

                                <Col md={7} lg={4}>
                                    <ListGroup variant='flush'>
                                        <ListGroup.Item className='px-0'>
                                            <h3>{product?.name}</h3>
                                        </ListGroup.Item>

                                        <ListGroup.Item className='px-0'>

                                            <Ratings rating={product?.rating} numReviews={product?.numReviews} color='gold'></Ratings>

                                        </ListGroup.Item>

                                        <ListGroup.Item className='px-0'>
                                            {t('price')}: {currency(product?.price)}
                                        </ListGroup.Item>

                                        <ListGroup.Item className='px-0'>
                                            {t('description')}: {product?.description}
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Col>

                                <Col md={5} lg={3} className="my-3">
                                    <Card>
                                        <ListGroup variant='flush'>
                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>{t('price')}: </Col>
                                                    <Col><strong>{currency(product?.price)}</strong></Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col>Status: </Col>
                                                    <Col>{product?.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    <Col className="d-flex align-items-center">{t('quantity')}: </Col>
                                                    <Col>
                                                        {product?.countInStock > 0 && (
                                                            <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                                                                {[...Array(product.countInStock).keys()].map((num) =>
                                                                    <option key={num}>{num + 1}</option>
                                                                )}
                                                            </Form.Control>
                                                        )}</Col>
                                                </Row>
                                            </ListGroup.Item>

                                            <ListGroup.Item>
                                                <Row>
                                                    {isInCart ? (
                                                        <Button type='button' className="btn btn-block"
                                                            disabled={product?.countInStock <= 0 ? true : false}
                                                            onClick={removeFromCartHandler}>
                                                            <i className="fas fa-times mr-2"></i>
                                                            {t('remove-from-cart')}
                                                        </Button>
                                                    ) : (
                                                        <Button type='button' className="btn btn-block"
                                                            disabled={product?.countInStock <= 0 ? true : false}
                                                            onClick={addToCartHandler}>
                                                            <i className="fas fa-plus mr-2"></i>
                                                            {t('add-to-cart')}
                                                        </Button>
                                                    )}
                                                </Row>
                                                <Row>
                                                    <Link to='/cart' className='btn btn-info btn-block mt-2'>
                                                        <i className="fas fa-shopping-cart mr-2"></i>
                                                        {t('go-to-cart')}
                                                    </Link>
                                                </Row>
                                                {
                                                    user?.isAdmin && (
                                                        <Row>
                                                            <Link to={`/admin/productedit/${match.params.id}/edit`} className='btn btn-warning btn-block mt-2'>
                                                                <i className="fas fa-cut mr-2"></i>
                                                                {t('edit-product')}
                                                            </Link>
                                                        </Row>
                                                    )
                                                }
                                            </ListGroup.Item>
                                        </ListGroup>
                                    </Card>
                                </Col>
                            </Row>
                        </>
                    )
            }
        </>
    )
}

export default ProductScreen;