import React from 'react';
import renderCanvasGIF from '../utils/canvasGIF';
import { RootState } from '../store'; // Adjust the import path as necessary
import { ActionCreatorsMapObject, bindActionCreators, Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import * as actionCreators from '../store/actions/actionCreators'; // Adjust the import path as necessary

interface DownloadDrawingProps extends PropsFromRedux {
  downloadType: string; // Adjust the type if necessary
}

const DownloadDrawing: React.FC<DownloadDrawingProps> = props => {
  const DOWNLOAD_MESSAGE = 'Downloading...';

  const download = (type: string) => {
    const { frames, activeFrame, columns, rows, cellSize, duration } = props;
    props.actions.sendNotification(DOWNLOAD_MESSAGE);
    renderCanvasGIF({
      type,
      frames,
      activeFrame,
      columns,
      rows,
      cellSize,
      duration
    });
  };

  return (
    <button
      type="button"
      className="download-btn"
      onClick={() => {
        download(props.downloadType);
      }}
    >
      DOWNLOAD
    </button>
  );
};

const mapStateToProps = (state: RootState) => ({
  frames: state.present.get('frames'),
  activeFrame: state.present.getIn(['frames', 'activeFrame']),
  columns: state.present.getIn(['frames', 'columns']),
  rows: state.present.getIn(['frames', 'rows']),
  cellSize: state.present.get('cellSize'),
  duration: state.present.get('duration')
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(DownloadDrawing);
