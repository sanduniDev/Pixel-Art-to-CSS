import React from 'react';
import PixelGrid from './PixelGrid';

interface DrawHandlers {
  onMoveMouseOver: (ev: React.MouseEvent | React.FocusEvent) => void;
  onMoveMouseDown: (ev: React.MouseEvent) => void;
  onMoveTouchStart: (ev: React.TouchEvent) => void;
  onMoveTouchMove: (ev: React.TouchEvent) => void;
}

interface GridWrapperProps {
  cells: any[]; // Adjust the type as necessary
  activeTool: string;
  drawHandlers: DrawHandlers;
  classes?: string;
  nbrColumns: number;
  hoveredCell?: any; // Adjust the type as necessary
}

export default class GridWrapper extends React.Component<GridWrapperProps> {
  shouldComponentUpdate(newProps: GridWrapperProps) {
    const { cells } = this.props;
    return newProps.cells !== cells;
  }

  onMouseOver(ev: React.MouseEvent | React.FocusEvent) {
    const { activeTool, drawHandlers } = this.props;
    if (activeTool === 'MOVE') {
      drawHandlers.onMoveMouseOver(ev);
    }
  }

  onMouseDown(ev: React.MouseEvent) {
    const { activeTool, drawHandlers } = this.props;
    if (activeTool === 'MOVE') {
      drawHandlers.onMoveMouseDown(ev);
    }
  }

  onTouchStart(ev: React.TouchEvent) {
    const { activeTool, drawHandlers } = this.props;
    if (activeTool === 'MOVE') {
      drawHandlers.onMoveTouchStart(ev);
    }
  }

  onTouchMove(ev: React.TouchEvent) {
    const { activeTool, drawHandlers } = this.props;
    if (activeTool === 'MOVE') {
      drawHandlers.onMoveTouchMove(ev);
    }
  }

  render() {
    const { props } = this;
    return (
      <div
        onMouseOver={ev => this.onMouseOver(ev)}
        onFocus={ev => this.onMouseOver(ev)}
        onMouseDown={ev => this.onMouseDown(ev)}
        onTouchStart={ev => this.onTouchStart(ev)}
        onTouchMove={ev => this.onTouchMove(ev)}
      >
        <PixelGrid
          cells={props.cells}
          drawHandlers={props.drawHandlers}
          classes={props.classes}
          nbrColumns={props.nbrColumns}
          hoveredCell={props.hoveredCell}
        />
      </div>
    );
  }
}
