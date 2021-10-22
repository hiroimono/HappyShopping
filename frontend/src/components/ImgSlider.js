import React from 'react';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-bootstrap';

const ImgSlider = ({ productId, images, style }) => {
    return (
        <Carousel interval={null} style={{
            width: style?.width ? style.width : '100%',
            height: style?.height ? style.height : '100%',
            cursor: images?.length === 1 ? 'auto' : 'pointer'
        }} controls={images?.length === 1 ? false : true}>
            {
                images?.length !== 0 && images.map((image, i) => (
                    <Carousel.Item key={i}>
                        <Link to={`/products/${productId}`}>
                            <img
                                src={image?.path}
                                alt={image.name}
                                style={{
                                    ...style,
                                    objectFit: 'cover'
                                }}
                            />
                        </Link>
                    </Carousel.Item>
                ))
            }
        </Carousel>
    )
}

export default ImgSlider
