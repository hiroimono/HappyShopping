import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
// import { Link } from 'react-router-dom';

// bootstrap
import { Button, Form, Card } from 'react-bootstrap';

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

// Constants for action types
// import { constants } from '../constants/constant.js';

// actions
import { addNewProduct, getSingleProduct } from '../actions/productActions';

const AdminAddNewProductScreen = ({ match, history }) => {
    const [validated, setValidated] = useState(false);
    const [productAddedSuccess, setProductAddedSuccess] = useState(false);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState('');
    const [image, setImage] = useState('');
    const [imgError, setImgError] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    const dispatch = useDispatch();

    const { userInfo } = useSelector(state => state.userLogin);
    const { loading: loadingProduct, error: errorProduct, product } = useSelector(state => state.product);
    const { loading, productAdded, error } = useSelector(state => state.productNewAdd);

    useEffect(() => {
        if (!userInfo) {
            history.push('/login')
        }
    }, [history, userInfo])

    // useEffect(() => {
    //     if (!(product?._id || successEdit)) {
    //         dispatch(getSingleProduct(match?.params.id))
    //     } else {
    //         if (product) {
    //             setName(product.name)
    //             setDescription(product.description)
    //             setBrand(product.brand)
    //             setCategory(product.category)
    //             setPrice(product.price)
    //             setCountInStock(product.countInStock)
    //             setImage(product.image)
    //         }
    //     }
    //     return () => {
    //         if (product && product._id) {
    //             dispatch({ type: constants.SINGLE_PRODUCT_RESET })
    //         };
    //     }
    // }, [dispatch, match?.params.id, product, successEdit])

    useEffect(() => {
        if (productAdded?._id) {
            dispatch(getSingleProduct(productAdded._id))
            setProductAddedSuccess(true)
            // history.push('/admin/productlist')
        }
    }, [dispatch, productAdded])

    useEffect(() => {
        if (product) {
            setName(product.name)
            setDescription(product.description)
            setBrand(product.brand)
            setCategory(product.category)
            setPrice(product.price)
            setCountInStock(product.countInStock)
            setImage(product.image)
        }
    }, [dispatch, product])

    const submitHandler = (e) => {
        const form = e.currentTarget;
        e.preventDefault();
        if (!form?.checkValidity()) {
            e.stopPropagation();
            setValidated(true);
        } else {
            dispatch(addNewProduct({ name, description, brand, category, price, countInStock, image }))
        }
    }

    const uploadFileHandler = async (e) => {
        console.log('e.target: ', e.target);
        const file = e.target.files[0];
        console.log('file: ', file);
        const formData = new FormData();

        try {
            setIsUploading(true);
            let isImage = (/image\/.*/gm).test(file.type)

            if (isImage) {
                formData.append('image', file)
                const config = {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }

                const { data } = await axios.post('/api/uploads', formData, config)

                setImage(data);
            } else {
                // throw new Error('File is not an image. Accepted types: ".jpg", ".jpeg", ".png"')
                setImgError('File is not an image. Accepted types: ".jpg", ".jpeg", ".png"')
            }

        } catch (error) {
            console.log(error)
        } finally {
            setIsUploading(false)
        }
    }

    return (
        <FormContainer>
            <h2>Add a New Product</h2>
            {loading || loadingProduct || isUploading ? (
                <Loader />
            ) : error || errorProduct || imgError ? (
                <Message variant='danger'>{error || errorProduct || imgError}</Message>
            ) : (
                <>
                    {productAddedSuccess && <Message variant='success'>Success: Product was successfully generated!</Message>}
                    <Card>
                        <Card.Body>
                            <Form noValidate validated={validated} onSubmit={submitHandler}>
                                <Form.Group controlId='name'>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required type='text' placeholder='Enter your name' value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a product name.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='description'>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required as="textarea" rows={3} placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a product description.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='brand'>
                                    <Form.Label>Brand</Form.Label>
                                    <Form.Control required type='text' placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a product brand.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='category'>
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control required type='text' placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a product category.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group controlId='price'>
                                    <Form.Label>Price (€)</Form.Label>
                                    <Form.Control required type='number' placeholder='Enter price' value={price} onChange={(e) => e.target.value >= 0 && setPrice(e.target.value)}></Form.Control>
                                    {price >= 0 && <Form.Control.Feedback>Looks good!</Form.Control.Feedback>}
                                    {price < 0 && <Form.Control.Feedback type="invalid">Please enter a positive number!</Form.Control.Feedback>}
                                    {
                                        // eslint-disable-next-line eqeqeq
                                        price == undefined &&
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a product price.
                                        </Form.Control.Feedback>
                                    }
                                </Form.Group>

                                <Form.Group controlId='countInStock'>
                                    <Form.Label>Count In Stock</Form.Label>
                                    <Form.Control required type='number' placeholder='Enter amount of item in stock' value={countInStock} onChange={(e) => e.target.value >= 0 && setCountInStock(e.target.value)}></Form.Control>
                                    {countInStock >= 0 && <Form.Control.Feedback>Looks good!</Form.Control.Feedback>}
                                    {countInStock < 0 && <Form.Control.Feedback type="invalid">Please enter a positive number!</Form.Control.Feedback>}
                                    {
                                        // eslint-disable-next-line eqeqeq
                                        countInStock == undefined &&
                                        <Form.Control.Feedback type="invalid">
                                            Please choose a product stock number.
                                        </Form.Control.Feedback>
                                    }
                                </Form.Group>

                                <Form.Group controlId='image'>
                                    <Form.Label>image</Form.Label>
                                    <Form.Control required type='text' placeholder='Enter image' value={image} onChange={(e) => setImage(e.target.value)}></Form.Control>
                                    <Form.File id="image-file" label="Choose File" custom onChange={uploadFileHandler}></Form.File>
                                    <Form.Control.Feedback type="invalid">
                                        Please choose a product image.
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                {/* <Form.Group className="mb-3" controlId="isAdmin">
                                <Form.Label>Permission Level</Form.Label>
                                <Form.Check type="checkbox" label='Admin' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                                <Form.Check type="checkbox" label='User' checked={!isAdmin} onChange={e => setIsAdmin(!e.target.checked)} />
                            </Form.Group> */}

                                <Button type='submit' variant='primary' className="mr-2">Generate</Button>

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

export default AdminAddNewProductScreen
