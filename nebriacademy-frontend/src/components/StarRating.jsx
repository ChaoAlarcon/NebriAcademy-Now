import React, { useState } from 'react';

/**
 * Componente de valoración con estrellas (1-5).
 * Puede ser interactivo (para votar) o de solo lectura (para mostrar promedio).
 */
const StarRating = ({ rating, onRatingChange, readonly = false }) => {
    const [hover, setHover] = useState(0);

    return (
        <div className="star-rating">
            {[...Array(5)].map((star, index) => {
                const ratingValue = index + 1;
                return (
                    <button
                        type="button"
                        key={index}
                        className={ratingValue <= (hover || rating) ? "star-on" : "star-off"}
                        onClick={() => !readonly && onRatingChange(ratingValue)}
                        onMouseEnter={() => !readonly && setHover(ratingValue)}
                        onMouseLeave={() => !readonly && setHover(0)}
                        style={{
                            background: 'none',
                            border: 'none',
                            cursor: readonly ? 'default' : 'pointer',
                            outline: 'none',
                            fontSize: '1.5rem',
                            padding: '0 2px',
                            color: ratingValue <= (hover || rating) ? '#ffc107' : '#e4e5e9',
                            transition: 'color 200ms'
                        }}
                    >
                        <span className="star">&#9733;</span>
                    </button>
                );
            })}
        </div>
    );
};

export default StarRating;
