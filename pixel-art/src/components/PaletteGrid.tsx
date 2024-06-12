import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { selectPaletteColor } from '../store/actions/actionCreators';
import { RootState } from '../store'; // Assuming you have defined your root state
import PaletteColor from './PaletteColor';

// Define the props structure for the component, if necessary from state
interface Color {
  id: string;
  color: string;
}

interface PaletteGridProps extends PropsFromRedux {
  grid: Color[];
  position: number;
}

// Utilize Redux Connect with TypeScript
const mapStateToProps = (state: RootState) => state.present.get('palette').toObject();

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(
  {
    selectPaletteColor
  },
  dispatch
);

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

const PaletteGrid: React.FC<PaletteGridProps> = ({ grid, position, selectPaletteColor }) => {
  const getColors = () => {
    const width = 100 / 6; // Assuming grid is always divided into 6

    return grid.map((color, index) => (
      <PaletteColor
        key={color.id} // Assumed you have an `id` field on each color
        positionInPalette={index}
        width={width}
        color={color.color}
        selected={position === index}
        selectPaletteColor={selectPaletteColor}
      />
    ));
  };

  return <div className="palette-grid">{getColors()}</div>;
};

const PaletteGridContainer = connector(PaletteGrid);
export default PaletteGridContainer;
