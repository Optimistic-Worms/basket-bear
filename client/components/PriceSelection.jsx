import React from 'react';
import axios from 'axios';

const PriceSelection = (props) => {
  return (
    <div>
    <div className="button button-settings">5%</div>
    <div className="button button-settings">10%</div>
    <div className="button button-settings">15%</div>
    <div className="button button-settings">20%</div>
    <div className="button button-settings">25%</div>
    <div>
      <input/>
      <div className="button button-settings">Set Price</div>
    </div>

  </div>
  )
}

export default PriceSelection;