import React from 'react';

const CardHeader = (props) => (
  <div className="cardHeader">
    <h2>{props.card.name}</h2>
  </div>
)

export default CardHeader;