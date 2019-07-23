import React from 'react';

const CardCreator = (props) => (
  <div>
    <div className="formContainer" style={props.style}>
      <div className="overlay" style={props.style} onClick={props.onClick}></div>
      <div className="createCard">
        <div className="createCardHeader">
          <div className="closeCreator" onClick={props.onClick}>&#10005;</div>
        </div>
        <div className="createForm">
          <div className="formGroup">
            <label>Name: </label>
            <input 
              type="text" 
              className="formControl"
              placeholder="Name your existential fear"
              required />
          </div>
          <div className="formGroup">
            <label>Description: </label>
            <input 
              type="text" 
              className="formControl"
              placeholder="Why is it so scary?"
              required />
          </div>
          <div className="formGroup">
            <label>Fun fact: </label>
            <input 
              type="text" 
              className="formControl"
              placeholder="Maybe a fun fact will lighten the mood?" 
              required />
          </div>
          <div className="formGroup">
            <label>Picture: </label>
            <input 
              type="text" 
              className="formControl"
              placeholder="Paste an image link for pizzazz!" 
              required />
          </div>
          <div className="submitContainer">
            <input type="submit" className="submit" value="Create" /> 
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default CardCreator;