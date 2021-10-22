import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import axios from 'axios';
// import { Link } from 'react-router-dom';

// bootstrap
import { Button, Form, Card, InputGroup, ListGroup, Row, Col, Image } from 'react-bootstrap';

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
    const [image, setImage] = useState([]);
    const [imgError, setImgError] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const dispatch = useDispatch();
    const fileRef = useRef();

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
            setImage([...product.image])
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
        let files = [];
        setImgError([]);
        for (let key in e.target.files) {
            if (key !== 'item' && key !== 'length') {
                let file = e.target.files[key];
                let isImage = (/image\/.*/gm).test(file.type)
                isImage ? files.push(file) : setImgError(imgError => [...imgError, `${file.name} is not an image file. Accepted types:  ".jpg", ".jpeg", ".png"`])
            }
        }

        const formData = new FormData();

        try {
            setIsUploading(true);
            files.forEach(file => formData.append('image', file));
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('/api/uploads', formData, config)
            setImage(image => [...image, ...data.filter(item => !image.filter(img => item.originalname === img.originalname).length)]);
        } catch (error) {
            console.log(error)
        } finally {
            setIsUploading(false)
        }
    }

    const removeImgHandler = async (name, index) => {
        try {
            setIsUploading(true);
            const { data } = await axios.delete(`/api/uploads/delete/${name}`)
            if (data?.status === 'deleted') {
                let arr = [...image]
                let deleted = arr.splice(index, 1);
                if (deleted) setImage(arr);
            } else {
                setImgError(['Some Images were not deleted successfully!'])
            }
        } catch (error) {
            const message = error.response && error.response.data.message ? error.response.data.message : error.message
            setImgError([message])
        } finally {
            setIsUploading(false)
        }
    }

    const currency = (amount) => {
        return amount ? new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount) : ''
    }

    return (
        <FormContainer>
            <h2>Add a New Product</h2>
            {
                (loading || loadingProduct || isUploading) && <Loader />
            }
            {
                (error || errorProduct) && <Message variant='danger'>{error || errorProduct}</Message>
            }
            {
                imgError?.length !== 0 && imgError.map((error, index) => <Message key={index} variant='danger'>{error}</Message>)
            }
            {
                productAddedSuccess && <Message variant='success'>Success: Product was successfully generated!</Message>
            }
            <>
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
                                <InputGroup>
                                    <Form.Control type='text' placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                                    <InputGroup.Text id="btnGroupAddon">Value: {currency(price ? price : '0')}</InputGroup.Text>
                                </InputGroup>
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
                                <Form.Label>Image</Form.Label>
                                {/* {
                                    image?.length && image.map((img, index) => (
                                        <Form.Control key={index} required type='text' placeholder='Enter image' value={img} onChange={(e) => { arr = [...image]; arr[index] = e.target.value; setImage(arr) }}></Form.Control>
                                    ))
                                } */}

                                <ListGroup>
                                    {
                                        image?.length !== 0 && image.map((img, index) => (
                                            <ListGroup.Item key={index} className="mb-1 p-1" style={{ backgroundColor: 'ghostwhite', borderTopWidth: '1px' }}>
                                                <Row className="align-items-center m-0">
                                                    <Col xs={1} className='px-0'>
                                                        <Image src={img?.path} alt={img?.name} fluid rounded />
                                                    </Col>

                                                    <Col xs={9} className="px-0 pl-3 text-sm-left">
                                                        {img?.name}
                                                    </Col>

                                                    <Col xs={2} className="px-2 text-right">
                                                        <Button type='button' variant="light" onClick={() => removeImgHandler(img.name, index)}>
                                                            <i className='fas fa-trash'></i>
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        ))}
                                </ListGroup>

                                <Form.File ref={fileRef} id="image-file" label="Choose File" custom onChange={uploadFileHandler} multiple></Form.File>
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
        </FormContainer>
    )
}

export default AdminAddNewProductScreen
