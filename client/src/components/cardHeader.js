import React from 'react';

const CardHeader = (props) => (
  <div className="card-header">
    <div className="card-selector" onClick={() => props.showCard(props.card.name)}>
      <h4>{props.card.name}</h4>
    </div>
    <div className="delete-container">
      <div className="icon reject" id="delete" onClick={() => props.onClick(props.card._id)}>&#10005;</div>
    </div>
  </div>
)

export default CardHeader;