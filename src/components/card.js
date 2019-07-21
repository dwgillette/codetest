import React from 'react';

const Card = (props) => (
  <div className="cardContainer">
    <div className="cardInfo">
      <div className="imgContainer">
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
    <div className="cardButtonsContainer">
      <div className="icon reject" onClick={() => props.onClick("reject")}>&#10006;</div>
      <div className="icon check" onClick={() => props.onClick("accept")}>&#10004;</div>
    </div>
  </div>
)

export default Card;