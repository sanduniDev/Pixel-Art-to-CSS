import React from 'react';
import PixelCell from './PixelCell';

// Define types for the props
interface Cell {
  id: number;
  color: string; 
  width: number; 
}

interface DrawHandlers {
  onMouseDown: (id: number, event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
  onMouseOver: (id: number, event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) => void;
  onTouchMove: (event: React.TouchEvent<HTMLDivElement>) => void;
}

interface PixelGridProps {
  cells: Cell[];
  drawHandlers: DrawHandlers;
  classes: string;
  nbrColumns: number;
  hoveredCell?: number; 
}

const PixelGrid: React.FC<PixelGridProps> = ({
  cells,
  drawHandlers,
  classes
}) => (
  <div className={classes} onTouchMove={drawHandlers.onTouchMove}>
    {cells.map(cell => (
      <PixelCell
        key={cell.id}
        cell={cell}
        id={cell.id}
        drawHandlers={drawHandlers}
      />
    ))}
  </div>
);

export default PixelGrid;
