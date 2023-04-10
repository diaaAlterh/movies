import React from 'react';
import "./RatingStar.css";
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function RatingStar(props) {
  return (
    <div className="rating-star">
      <FontAwesomeIcon icon={faStar} />
      <span className="rating-number">{props.rating}</span>
    </div>
  );
}

export default RatingStar;
