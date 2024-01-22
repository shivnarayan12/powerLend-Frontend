import React, { useEffect } from 'react';
import ".//TopCat.css";
import 'typeface-montserrat';
import { Link } from 'react-router-dom';

export default function Products(props) {

  return (
        <>
        
    <div class="card">
      <div class="">
        <img src={props.url} alt="" width={90}/>
      </div>
      <div class="text">
        <p class="h3">{props.name}</p>

        <Link to={`/ProductPage/${props.id}`}  style={{textDecoration:"none"}}><button class="ui-btn">
              <span>Pick ₹{props.rate}</span>
            </button></Link>
      </div>
    </div>

        </>
  )
}

