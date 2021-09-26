import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
// import { Link } from 'react-router-dom';

// bootstrap
import { Button, Form, Card } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

// Constants for action types
import { constants } from '../constants/constant.js';

// actions
import { getSingleProduct, editSingleProduct } from '../actions/productActions';

const AdminProductEditScreen = ({ match, history }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [image, setImage] = useState('');

    const dispatch = useDispatch();
    const { loading, error, product } = useSelector(state => state.product);

    const { userInfo } = useSelector(state => state.userLogin);
    const { success: successEdit, error: errorEdit, loading: loadingEdit } = useSelector(state => state.productEdit);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [history, userInfo])

    useEffect(() => {
        if (!(product?._id || successEdit)) {
            dispatch(getSingleProduct(match?.params.id))
        } else {
            if (product) {
                setName(product.name)
                setDescription(product.description)
                setBrand(product.brand)
                setCategory(product.category)
                setPrice(product.price)
                setCountInStock(product.countInStock)
                setImage(product.image)
            }
        }
        return () => {
            if (product && product._id) {
                dispatch({ type: constants.SINGLE_PRODUCT_RESET })
            };
        }
    }, [dispatch, match?.params.id, product, successEdit])

    useEffect(() => {
        if (successEdit) {
            dispatch(getSingleProduct(match?.params.id))
            // history.push('/admin/productlist')
        }
        return () => {
            if (successEdit || errorEdit) {
                dispatch({ type: constants.PRODUCT_EDIT_RESET })
            };
        }
    }, [dispatch, errorEdit, match?.params.id, successEdit])

    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(editSingleProduct({ id: product._id, name, description, brand, category, price, countInStock, image }));
    }

    return (
        <FormContainer>
            <h2>Edit Product</h2>
            {loading || loadingEdit ? (
                <Loader />
            ) : error || errorEdit ? (
                <Message variant='danger'>{error || errorEdit}</Message>
            ) : (
                <>
                    {successEdit && <Message variant='success'>Success: Product Item was updated!</Message>}
                    <Card>
                        <Card.Body>
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='brand'>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label>Price (€)</Form.Label>
                                    <Form.Control type='number' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='countInStock'>
                                    <Form.Label>Count In Stock</Form.Label>
                                    <Form.Control type='number' placeholder='Enter amount of item in stock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                                </Form.Group>

                                <Form.Group controlId='image'>
                                    <Form.Label>image</Form.Label>
                                    <Form.Control type='text' placeholder='Enter image' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                                </Form.Group>

                                {/* <Form.Group className="mb-3" controlId="isAdmin">
                                <Form.Label>Permission Level</Form.Label>
                                <Form.Check type="checkbox" label='Admin' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                                <Form.Check type="checkbox" label='User' checked={!isAdmin} onChange={e => setIsAdmin(!e.target.checked)} />
                            </Form.Group> */}

                                <Button type='submit' variant='primary' className="mr-2">Update</Button>

                                <LinkContainer to={`/admin/productlist`}>
                                    <Button variant='info' className="mr-2"><i className="fas fa-chevron-circle-left mr-1"></i>Back to Product List</Button>
                                </LinkContainer>
                            </Form>
                        </Card.Body>
                    </Card>
                </>
            )}
        </FormContainer>
    )
}

export default AdminProductEditScreen
