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
              value={props.name}
              placeholder="Name your existential fear"
              required
              onChange={(e) => props.onChange("name", e)} />
          </div>
          <div className="formGroup">
            <label>Description: </label>
            <input 
              type="text" 
              className="formControl"
              value={props.desc}
              placeholder="Why is it so scary?"
              required
              onChange={(e) => props.onChange("desc", e)} />
          </div>
          <div className="formGroup">
            <label>Fun fact: </label>
            <input 
              type="text" 
              className="formControl"
              value={props.fact}
              placeholder="Maybe a fun fact will lighten the mood?" 
              required
              onChange={(e) => props.onChange("fact", e)} />
          </div>
          <div className="formGroup">
            <label>Picture: </label>
            <input 
              type="url" 
              className="formControl"
              value={props.picture}
              placeholder="Paste an image link for pizzazz!" 
              required
              onChange={(e) => props.onChange("picture", e)} />
          </div>
          <div className="submitContainer">
            <input 
              type="submit" 
              className="submit" 
              value="Create"
              onClick={props.onSubmit} /> 
          </div>
        </div>
      </div>
    </div>
  </div>
)

export default CardCreator;