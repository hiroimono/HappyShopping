import React from 'react'
import PropTypes from 'prop-types'


const Ratings = ({ rating, numReviews, color }) => {
    let nums = [1, 2, 3, 4, 5];
    return (
        <div>
            { nums.map(num => (
                <i key={num} className={rating >= num ? 'fas fa-star pr-1' : (rating >= (num - 0.5) ? 'fas fa-star-half-alt pr-1' : 'far fa-star pr-1')} style={{ color: color }}></i>
            ))}
            {numReviews && <span> {numReviews} from reviews</span>}
        </div>
    )
}

Ratings.defaultProp = {
    color: 'gold'
}

Ratings.propTypes = {
    rating: PropTypes.number.isRequired,
    numReviews: PropTypes.number.isRequired,
    color: PropTypes.string
}

export default Ratings;