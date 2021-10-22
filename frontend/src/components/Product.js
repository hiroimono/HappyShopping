import React from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from 'react-bootstrap';

/** Components */
import Ratings from './Ratings';
import ImgSlider from './ImgSlider';

const Product = ({ product }) => {

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
