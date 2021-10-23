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
import { constants } from '../constants/constant.js';

// actions
import { getSingleProduct, editSingleProduct } from '../actions/productActions';

/** i18n */
import { useTranslation } from 'react-i18next'

const AdminProductEditScreen = ({ match, history }) => {
    const { t } = useTranslation();

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [brand, setBrand] = useState('');
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState('');
    const [countInStock, setCountInStock] = useState(0);
    const [image, setImage] = useState([]);
    const [imgError, setImgError] = useState([]);
    const [isUploading, setIsUploading] = useState(false);

    const dispatch = useDispatch();
    const fileRef = useRef();

    const { userInfo } = useSelector(state => state.userLogin);
    const { loading, error, product } = useSelector(state => state.product);
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
                console.log('product: ', product);
                setName(product.name)
                setDescription(product.description)
                setBrand(product.brand)
                setCategory(product.category)
                setPrice(product.price)
                setCountInStock(product.countInStock)
                setImage([...product.image])
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

    console.log('error, errorEdit, imgError: ', error, errorEdit, imgError);
    console.log('successEdit: ', successEdit);

    return (
        <FormContainer>
            <h2>{t('edit-product')}</h2>
            {
                loading || loadingEdit || isUploading ? (
                    <Loader />
                ) : (
                    <>
                        {(error || errorEdit) && <Message variant='danger'>{error || errorEdit}</Message>}
                        {successEdit && <Message variant='success'>{t('success-product-was-updated')}!</Message>}
                        {imgError?.length !== 0 && imgError.map((error, index) => <Message key={index} variant='danger'>{error}</Message>)}
                        <Card>
                            <Card.Body>
                                <Form onSubmit={submitHandler}>
                                    <Form.Group controlId='name'>
                                        <Form.Label>Name</Form.Label>
                                        <Form.Control type='text' placeholder={t('enter-product-name')} value={name} onChange={(e) => setName(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='description'>
                                        <Form.Label>{t('description')}</Form.Label>
                                        <Form.Control as="textarea" rows={3} placeholder={t('enter-description')} value={description} onChange={(e) => setDescription(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='brand'>
                                        <Form.Label>{t('brand')}</Form.Label>
                                        <Form.Control type='text' placeholder={t('enter-brand')} value={brand} onChange={(e) => setBrand(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='category'>
                                        <Form.Label>{t('category')}</Form.Label>
                                        <Form.Control type='text' placeholder={t('enter-category')} value={category} onChange={(e) => setCategory(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='price'>
                                        <Form.Label>{t('price')} (€)</Form.Label>
                                        <InputGroup>
                                            <Form.Control type='text' placeholder={t('enter-price')} value={price} onChange={(e) => setPrice(e.target.value)}></Form.Control>
                                            <InputGroup.Text id="btnGroupAddon">{currency(price)}</InputGroup.Text>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId='countInStock'>
                                        <Form.Label>Count In Stock</Form.Label>
                                        <Form.Control type='number' min='0' placeholder={t('enter-count-in-stock')} value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></Form.Control>
                                    </Form.Group>

                                    <Form.Group controlId='image'>
                                        <Form.Label>{t('image')}</Form.Label>
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

                                        <Form.File ref={fileRef} id="image-file" label={t('choose-file')} custom onChange={uploadFileHandler} multiple></Form.File>
                                    </Form.Group>

                                    {/* <Form.Group className="mb-3" controlId="isAdmin">
                                <Form.Label>Permission Level</Form.Label>
                                <Form.Check type="checkbox" label='Admin' checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                                <Form.Check type="checkbox" label='User' checked={!isAdmin} onChange={e => setIsAdmin(!e.target.checked)} />
                            </Form.Group> */}

                                    <Button type='submit' variant='primary' className="mr-2">{t('update')}</Button>

                                    <LinkContainer to={`/admin/productlist`}>
                                        <Button variant='info' className="mr-2">
                                            <i className="fas fa-chevron-circle-left mr-1"></i>
                                            {t('back-to-product-list')}
                                        </Button>
                                    </LinkContainer>
                                    {
                                        match?.params?.id && (
                                            <LinkContainer to={`/products/${match.params.id}`}>
                                                <Button variant='warning' className="mr-2">
                                                    <i className="fas fa-chevron-circle-up mr-1"></i>
                                                    {t('show-product')}
                                                </Button>
                                            </LinkContainer>
                                        )
                                    }
                                </Form>
                            </Card.Body>
                        </Card>
                    </>
                )
            }
        </FormContainer>
    )
}

export default AdminProductEditScreen
