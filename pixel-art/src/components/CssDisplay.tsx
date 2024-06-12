import React from 'react';
import { connect } from 'react-redux';
import { generatePixelDrawCss } from '../utils/cssParse';
import { RootState } from '../store'; // Update with the correct path to your RootState type

interface CssDisplayProps {
  activeFrame: any; // Replace 'any' with the actual type if available
  columns: number;
  cellSize: number;
}

const CssDisplay: React.FC<CssDisplayProps> = ({ activeFrame, columns, cellSize }) => {
  const generateCss = (): JSX.Element => {
    const cssString = generatePixelDrawCss(activeFrame, columns, cellSize, 'string');
    return <div>{cssString || ''}</div>;
  };

  return <div className="css-display">{generateCss()}</div>;
};

const mapStateToProps = (state: RootState) => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    activeFrame: frames.getIn(['list', activeFrameIndex]),
    columns: frames.get('columns'),
    cellSize: state.present.get('cellSize')
  };
};

const CssDisplayContainer = connect(mapStateToProps)(CssDisplay);
export default CssDisplayContainer;
