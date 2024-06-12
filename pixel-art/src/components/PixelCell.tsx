import React from 'react';

const GRID_INITIAL_COLOR = 'rgba(49, 49, 49, 1)';

// Define the types for the props
interface PixelCellProps {
  cell: {
    color: string;
    width: number;
  };
  id: number;
  drawHandlers: {
    onMouseDown: (id: number, event: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => void;
    onMouseOver: (id: number, event: React.MouseEvent<HTMLDivElement> | React.FocusEvent<HTMLDivElement>) => void;
  };
}

export default class PixelCell extends React.Component<PixelCellProps> {
  shouldComponentUpdate(nextProps: PixelCellProps) {
    const { cell } = this.props;
    const keys = ['color', 'width'] as const;
    const isSame = keys.every(key => cell[key] === nextProps.cell[key]);
    return !isSame;
  }

  render() {
    const {
      cell: { color, width },
      id,
      drawHandlers: { onMouseDown, onMouseOver }
    } = this.props;
    const styles = {
      width: `${width}%`,
      paddingBottom: `${width}%`,
      backgroundColor: color || GRID_INITIAL_COLOR
    };

    return (
      <div
        onMouseDown={(ev: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => onMouseDown(id, ev)}
        onMouseOver={(ev: React.MouseEvent<HTMLDivElement>) => onMouseOver(id, ev)}
        onFocus={(ev: React.FocusEvent<HTMLDivElement>) => onMouseOver(id, ev)}
        onTouchStart={(ev: React.TouchEvent<HTMLDivElement>) => onMouseDown(id, ev)}
        style={styles}
      />
    );
  }
}
