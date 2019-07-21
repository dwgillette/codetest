import React from 'react';

const Card = props => (
  <div className="cardContainer">
    <div className="imgContainer">
      <img className="img" src={props.card.picture} alt={props.card.name}></img>
    </div>
    {/*<div style={{ 'background-image': 'url(' + props.card.picture + ');'}}></div>*/}
    <h2>{props.card.name}</h2>
    <p>{props.card.desc}</p>
    <p>
      <strong>Fun fact: </strong>
      <br></br>
      {props.card.fact}
    </p>
  </div>
)

export default Card;