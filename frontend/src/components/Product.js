import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';

/** Components */
import Ratings from './Ratings';

const Product = ({ product }) => {
    const currency = (amount) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(amount)
    return (
        <>
            <Card className='pb-3 rounded h-100'>
                <Link to={`/products/${product?._id}`}>
                    <Card.Img src={product?.image} variant='top' style={{ 'height': '300px', 'objectFit': 'cover' }} />
                </Link>

                <Card.Body className="d-flex flex-column justify-content-between pb-0">
                    <Link to={`/products/${product?._id}`} title={product?.description}>
                        <Card.Title as='div'>
                            <strong>{product?.name}</strong>
                        </Card.Title>
                    </Link>

                    <Card.Text as='div'>
                        <Ratings rating={product.rating} numReviews={product.numReviews} color='gold' />
                        <h3 className="text-left mt-3">{currency(product.price)}</h3>
                    </Card.Text>
                </Card.Body>
            </Card>
        </>
    )
}

export default Product
