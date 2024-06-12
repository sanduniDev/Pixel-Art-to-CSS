import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import throttle from '../utils/throttle';
import GridWrapper from './GridWrapper';
import {
  cellAction,
  updateGridBoundaries,
  moveDrawing,
  changeHoveredCell
} from '../store/actions/actionCreators';
import { ERASER, EYEDROPPER, MOVE } from '../store/reducers/drawingToolStates';
import { RootState } from '../store';  // Assuming you have defined your root state type


const mapStateToProps = (state: RootState) => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  const drawingTool = state.present.get('drawingTool');
  const palette = state.present.get('palette');
  const position = palette.get('position');
  const paletteCellPosition = position === -1 ? 0 : position;
  return {
    grid: frames.getIn(['list', activeFrameIndex, 'grid']),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    hoveredIndex: frames.get('hoveredIndex'),
    drawingTool,
    paletteColor: palette.getIn(['grid', paletteCellPosition, 'color']),
    eyedropperOn: drawingTool === EYEDROPPER,
    eraserOn: drawingTool === ERASER,
    moveOn: drawingTool === MOVE,
    gridBoundaries: state.present.get('gridBoundaries')
  };
};

const mapDispatchToProps = (dispatch: any) => ({
  cellAction: (cellProps: any) => dispatch(cellAction(cellProps)),
  updateGridBoundariesThrottle: throttle(() => {
    const gridElement = document.getElementsByClassName('grid-container')[0] as HTMLElement;
    dispatch(updateGridBoundaries(gridElement));
  }, 500),
  applyMove: (moveDiff: any) => dispatch(moveDrawing(moveDiff)),
  hoveredCell: (cellPosition: number) => dispatch(changeHoveredCell(cellPosition))
});

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type PixelCanvasProps = PropsFromRedux & {
  drawHandlersFactory: (component: PixelCanvas) => any;  
};

class PixelCanvas extends React.Component<PixelCanvasProps> {
  private drawHandlers: any;
  private hoveredCell: any;  

  constructor(props: PixelCanvasProps) {
    super(props);
    this.drawHandlers = props.drawHandlersFactory(this);
    this.hoveredCell = props.hoveredCell;
  }

  componentDidMount() {
    const { updateGridBoundariesThrottle } = this.props;
    updateGridBoundariesThrottle();
    window.addEventListener('resize', updateGridBoundariesThrottle);
    window.addEventListener('scroll', updateGridBoundariesThrottle);
  }

  componentWillUnmount() {
    const { updateGridBoundariesThrottle } = this.props;
    window.removeEventListener('resize', updateGridBoundariesThrottle);
    window.removeEventListener('scroll', updateGridBoundariesThrottle);
  }

  render() {
    const { props } = this;
    const cells = props.grid.map((color: any, i: number) => ({  
      id: i,
      width: 100 / props.columns,
      color
    }));
    let gridExtraClass = 'cell';
    if (props.eraserOn) {
      gridExtraClass = 'context-menu';
    } else if (props.eyedropperOn) {
      gridExtraClass = 'copy';
    } else if (props.moveOn) {
      gridExtraClass = 'all-scroll';
    }

    return (
      <GridWrapper
        cells={cells}
        classes={`grid-container ${gridExtraClass}`}
        drawHandlers={this.drawHandlers}
        activeTool={props.drawingTool}
        nbrColumns={props.columns}
        hoveredCell={this.hoveredCell}
      />
    );
  }
}

const PixelCanvasContainer = connector(PixelCanvas);
export default PixelCanvasContainer;
