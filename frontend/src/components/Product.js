import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card, Badge } from 'react-bootstrap';

/** Components */
import Ratings from './Ratings';
import ImgSlider from './ImgSlider';

/** i18n */
import { useTranslation } from 'react-i18next'

const Product = ({ product }) => {
    const { t } = useTranslation();

    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)
    let history = useHistory()
    const relocate = () => history.push(`/products/${product?._id}`)

    return (
        <>
            <Card className='pb-3 rounded h-100'>
                <ImgSlider productId={product?._id} images={product?.image} style={{ 'width': '100%', 'height': '300px' }} />

                <Card.Body className="d-flex flex-column justify-content-between pointer pb-0" onClick={relocate} style={{ cursor: 'pointer' }}>
                    {/* <Link to={`/products/${product?._id}`} title={product?.description}> */}
                    <Card.Title as='div'>
                        <strong>{product?.name}</strong>
                        <sup className="ml-2">
                            <Badge pill className="badge-warning px-2 py-1">
                                {t('go')}<i className="fas fa-external-link-alt pl-2 fa-xs"></i>
                            </Badge>
                        </sup>
                    </Card.Title>
                    <Card.Text as='div'>
                        <Ratings rating={product.rating} numReviews={product.numReviews} color='gold' />
                        <h3 className="text-left mt-3">{currency(product.price)}</h3>
                    </Card.Text>
                    {/* </Link> */}
                </Card.Body>
            </Card>
        </>
    )
}

export default Product
