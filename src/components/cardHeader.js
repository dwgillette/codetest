import React from 'react';

const CardHeader = (props) => (
  <div className="cardHeader">
    <h4>{props.card.name}</h4>
    <div className="deleteContainer">
      <div className="icon reject" id="delete" onClick={() => props.onClick("reject")}>&#10005;</div>
    </div>
  </div>
)

export default CardHeader;