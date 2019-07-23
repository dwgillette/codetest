import React from 'react';

const Card = (props) => (
  <div className="card-container">
    <div className="card-info">
      <div className="img-container">
        <img className="img" src={props.card.picture} alt={props.card.name}></img>
      </div>
      <h2>{props.card.name}</h2>
      <p>{props.card.desc}</p>
      <p>
        <strong>Fun fact: </strong>
        <br></br>
        {props.card.fact}
      </p>
    </div>
    <div className="card-buttons-container">
      <div className="icon reject" id="reject" onClick={() => props.onClick("reject")}>&#10006;</div>
      <div className="icon check" id="check" onClick={() => props.onClick("accept")}>&#10004;</div>
    </div>
  </div>
)

export default Card;