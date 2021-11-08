import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

/** Bootstrap */
import { Row, Col, Card, ButtonGroup, Button } from 'react-bootstrap';

// actons
import { getProducts } from '../actions/productActions.js'

/** Components */
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';

/** i18n */
import { useTranslation } from 'react-i18next'

const HomeScreen = () => {
    const { t } = useTranslation();
    const { i18n } = useTranslation();

    const [cats, setCats] = useState([])
    const [selectedCat, setSelectedCat] = useState('')

    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)
    const [selectedProducts, setSelectedProducts] = useState([])

    useEffect(() => {
        dispatch(getProducts())
    }, [dispatch])

    useEffect(() => {
        if (products?.length) {
            selectedCat && !(selectedCat === 'All' || selectedCat === 'Alle') ? setSelectedProducts(products.filter(product => product.category === selectedCat)) : setSelectedProducts(products)
        }
    }, [dispatch, products, selectedCat])

    useEffect(() => {
        if (!cats?.length && products) {
            let arr = [];
            products.forEach(product => {
                let found = arr.find(item => item === product.category)
                if (!found) {
                    arr.push(product.category)
                }
            });
            setCats(arr);
        }
    }, [cats, products])

    useEffect(() => {
        if (cats?.length && !cats.find(cat => (i18n.language === 'en' && cat === 'All') || (i18n.language === 'de' && cat === 'Alle'))) {
            i18n.language === 'en' ? setCats(cats => {
                cats = cats.filter(cat => cat !== 'Alle' && cat !== 'All')
                return ['All', ...cats]
            }) : setCats(cats => {
                cats = cats.filter(cat => cat !== 'Alle' && cat !== 'All')
                return ['Alle', ...cats]
            })
        }
    }, [cats, i18n.language])

    return (
        <>
            {loading ?
                <Loader /> :
                error ?
                    <Message variant='danger' messageText={error} /> :
                    <Row>

                        <Col xs={12} md={3} lg={2} className="mb-4">
                            <Card>
                                <Card.Header>
                                    <h4>{t('categories')}:</h4>
                                </Card.Header>

                                <ButtonGroup vertical as={Card} className="p-0 border-0">
                                    {
                                        cats?.length && cats.map((cat, i) => (
                                            <Button key={i} className="btn btn-light btn-outline-warning border-0 text-left pl-3"
                                                onClick={() => setSelectedCat(cat)}>
                                                {cat}
                                            </Button>
                                        ))
                                    }
                                </ButtonGroup>
                            </Card>
                        </Col>

                        <Col xs={12} md={9} lg={10}>

                            <h2 className="mb-3">{t('latest-products')}</h2>

                            <Row>
                                {
                                    selectedProducts.map(product => (
                                        <Col key={product._id} xs={12} md={6} lg={4} className="mb-3">
                                            <Product product={product}></Product>
                                        </Col>
                                    ))
                                }
                            </Row>
                        </Col>
                    </Row>
            }
        </>
    )
}

export default HomeScreen
