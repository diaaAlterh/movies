import React from "react";
import "./RatingStar.css";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function RatingStar(props) {
  return (
    <div className={props.id ? "rating-star-big" : "rating-star"}>
      {props.id ? (
        <a
          href={`https://www.imdb.com/title/${props.id}/`}
          target="_blank"
          rel="noreferrer"
        >
          <img
            style={{ width: "60px", paddingRight: "10px" }}
            src="https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg"
            alt="IMDB Rating"
          ></img>
        </a>
      ) : (
        <FontAwesomeIcon icon={faStar} />
      )}
      <span className={props.id ? "rating-number-big" : "rating-number"}>
        {props.rating}
      </span>
    </div>
  );
}

export default RatingStar;
