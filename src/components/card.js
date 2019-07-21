import React from 'react';

const Card = props => (
  <div>
    <p>{props.card.name}</p>
    <p>{props.card.desc}</p>
    <p>{props.card.fact}</p>
    <p>{props.card.picture}</p>
  </div>
)

export default Card;