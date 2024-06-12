import React from 'react';

interface PaletteColorProps {
  positionInPalette: number;
  width: number;       
  color: string;       
  selected: boolean;   
  selectPaletteColor: (position: number) => void; 
}

const PaletteColor: React.FC<PaletteColorProps> = ({
  positionInPalette,
  width,
  color,
  selected,
  selectPaletteColor
}) => {
  const handleClick = () => selectPaletteColor(positionInPalette);

  const cellColor = color;
  const styles = {
    width: `${width}%`,
    paddingBottom: `${width}%`,
    backgroundColor: cellColor
  };

  return (
    <button
      type="button"
      aria-label="Color Palette"
      className={`palette-color ${selected ? 'selected' : ''}`}
      style={styles}
      onClick={handleClick}
    />
  );
};

export default PaletteColor;
