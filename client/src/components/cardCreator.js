import React from 'react';

const CardCreator = (props) => (
  <div>
    <div className="form-container" style={props.style}>
      <div className="overlay" style={props.style} onClick={props.onClick}></div>
      <div className="create-card">
        <div className="create-card-header">
          <div className="close-creator" onClick={props.onClick}>&#10005;</div>
        </div>
        <div className="create-form">
          <div className="form-group">
            <label>Name: </label>
            <input 
              type="text" 
              className="form-control"
              value={props.name}
              placeholder="Name your existential fear"
              required
              onChange={(e) => props.onChange("name", e)} />
          </div>
          <div className="form-group">
            <label>Description: </label>
            <input 
              type="text" 
              className="form-control"
              value={props.desc}
              placeholder="Why is it so scary?"
              required
              onChange={(e) => props.onChange("desc", e)} />
          </div>
          <div className="form-group">
            <label>Fun fact: </label>
            <input 
              type="text" 
              className="form-control"
              value={props.fact}
              placeholder="Maybe a fun fact will lighten the mood?" 
              required
              onChange={(e) => props.onChange("fact", e)} />
          </div>
          <div className="form-group">
            <label>Picture: </label>
            <input 
              type="url" 
              className="form-control"
              value={props.picture}
              placeholder="Paste an image link for pizzazz!" 
              required
              onChange={(e) => props.onChange("picture", e)} />
          </div>
          <div className="submit-container">
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