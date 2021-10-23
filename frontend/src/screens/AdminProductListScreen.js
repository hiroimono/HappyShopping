import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';

// bootstrap
import { Row, Table, Button, Modal, Col } from 'react-bootstrap'

// Components
import Message from '../components/Message';
import Loader from '../components/Loader';

// Actions
import { getProducts, deleteSingleProduct } from '../actions/productActions.js';

// Custom Hooks
import useBreakpoint from '../customHooks/useBreakpoint';

// Constants for action types
// import { constants } from '../constants/constant.js';

/** i18n */
import { useTranslation, Trans } from 'react-i18next'

const AdminProductListScreen = ({ history, match }) => {
    const { t } = useTranslation();

    // const [showSuccess, setShowSuccess] = useState(false);
    const dispatch = useDispatch();
    const { width } = useBreakpoint();

    const { products, loading, error } = useSelector(state => state.products);
    const { userInfo } = useSelector(state => state.userLogin);
    const { deletedProduct, loading: loadingDeleted, error: errorDeleted } = useSelector(state => state.productDelete);

    useEffect(() => {
        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        } else if (userInfo?.isAdmin) {
            dispatch(getProducts())
        }
    }, [dispatch, userInfo, history])

    useEffect(() => {
        if (userInfo?.isAdmin && deletedProduct) {
            dispatch(getProducts())
        }
    }, [dispatch, userInfo, deletedProduct])

    const [show, setShow] = useState(false);
    const [productForDelete, setProductForDelete] = useState(null);

    const deleteHandlerShow = (user) => {
        setProductForDelete(user);
        setShow(true)
    };

    const handleConfirm = (confirm) => {
        if (confirm) {
            dispatch(deleteSingleProduct(productForDelete._id));
        }
        setShow(false)
    };

    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)

    return loading || loadingDeleted ?
        <Loader /> :
        error || errorDeleted ?
            <Message variant='danger'>{error || errorDeleted}</Message> :
            <>
                <Row>
                    <Col>
                        <h3>{t('products')}:</h3>
                    </Col>

                    <Col className="text-right">
                        <LinkContainer to='/admin/product/add'>
                            <Button variant="warning">
                                <i className={`fas fa-plus ${width >= 576 && 'mr-2'}`}></i>
                                {width < 576 ? null : t('add-product')}
                            </Button>
                        </LinkContainer>
                    </Col>
                </Row>
                {/* {showSuccess && <Message variant="success">Product edited successfully.</Message>} */}
                {
                    deletedProduct && (
                        <Message variant="success">
                            <Trans i18nKey="success-deleted-product">
                                Product '{deletedProduct?.name}' with id: {deletedProduct?._id} was successfully deleted
                            </Trans>
                        </Message>
                    )
                }
                {
                    !products?.length ? (
                        <Message variant="info">
                            {t('there-is-no-product-yet')}.
                            <LinkContainer to='/'>
                                <Button className="btn-sm ml-3" variant='outline-info'>
                                    <i className="fas fa-home pr-1"></i> Home
                                </Button>
                            </LinkContainer>
                        </Message>
                    ) : (
                        <Table striped bordered responsive hover className="table-sm">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Id</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Name</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('price')}</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('category')}</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('brand')}</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product) => (
                                        <tr key={product._id}>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{product._id}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{product.name}</td>
                                            <td className="text-right" style={{ verticalAlign: 'middle' }}>{currency(product.price)}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{product.category}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle' }}>{product.brand}</td>
                                            <td className="text-center" style={{ verticalAlign: 'middle', whiteSpace: 'nowrap' }}>
                                                <LinkContainer to={`/admin/productedit/${product._id}/edit`}>
                                                    <Button className="btn-sm mr-2" variant='outline-info'>
                                                        <i className='fas fa-edit'></i>
                                                    </Button>
                                                </LinkContainer>
                                                <Button className="btn-sm mr-2" variant='danger' onClick={() => deleteHandlerShow(product)} data-toggle="confirmation">
                                                    <i className='fas fa-trash'></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    )
                }

                <Modal show={show} size={'lg'} onHide={() => handleConfirm(false)}>
                    <Modal.Body>
                        <h3> {t('would-you-really-want-to-remove-the-product')}? </h3>

                        <Table striped bordered responsive hover className="table-sm mt-4">
                            <thead>
                                <tr>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Id</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>Name</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('price')}</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('category')}</th>
                                    <th className="text-center" style={{ verticalAlign: 'middle', textTransform: 'uppercase' }}>{t('brand')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{productForDelete?._id}</td>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{productForDelete?.name}</td>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{productForDelete?.price}</td>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{productForDelete?.category}</td>
                                    <td className="text-center" style={{ verticalAlign: 'middle' }}>{productForDelete?.brand}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => handleConfirm(false)}>
                            {t('no')}
                        </Button>
                        <Button variant="primary" onClick={() => handleConfirm(true)}>
                            {t('yes')}
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
}

export default AdminProductListScreen
