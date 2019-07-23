import React from 'react';

const CollectionHeader = (props) => (
  <div className="collectionHeader">
    <h4>Collection</h4>
    <div className="createContainer">
      <div className="createButton" onClick={() => props.onClick("show")}>+</div>
    </div>
  </div>
)

export default CollectionHeader;