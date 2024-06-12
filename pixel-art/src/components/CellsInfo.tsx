import React from 'react';
import { Map } from 'immutable'; // Assuming you're using Immutable.js
import { useFrameStore } from '../store'; // Adjust the import path as needed

const CellsInfo: React.FC = () => {
  const hoveredIndex = useFrameStore(state => state.hoveredIndex);
  
  const xPos = hoveredIndex ? hoveredIndex.get('x') : '0';
  const yPos = hoveredIndex ? hoveredIndex.get('y') : '0';

  return (
    <>{hoveredIndex && <div className="cellinfo">{`${xPos}, ${yPos}`}</div>}</>
  );
};

export default CellsInfo;
