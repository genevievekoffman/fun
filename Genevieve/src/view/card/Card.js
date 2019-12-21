import React, { useState } from 'react';
import './Card.css';
 
function Card(props) {

    return (
        <div className='card'>
            Name: <span>{props.info.name} </span>, 
            Age: <span>{props.info.age}</span>
            
             
        </div>
    )

}

export default Card;