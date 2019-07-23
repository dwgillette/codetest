import React from 'react';

const CollectionHeader = (props) => (
  <div className="collection-header">
    <h4>Collection</h4>
    <div className="create-container">
      <div className="create-button" onClick={() => props.onClick("show")}>+</div>
    </div>
  </div>
)

export default CollectionHeader;