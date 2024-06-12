// import React from 'react';
// import { connect, ConnectedProps } from 'react-redux';
// import { bindActionCreators, Dispatch } from 'redux';
// import shortid from 'shortid';
// import * as actionCreators from '../store/actions/actionCreators';
// import { saveProjectToStorage } from '../utils/storage';
// import { RootState } from '../store'; // Adjust the path as needed to import your root Redux state type

// // Define props structure for the component
// interface SaveDrawingProps extends PropsFromRedux {
//   // Add any additional props here if needed
// }

// // Mapping state to props
// const mapStateToProps = (state: RootState) => {
//   const frames = state.present.get('frames');
//   return {
//     frames: frames.get('list'),
//     columns: frames.get('columns'),
//     rows: frames.get('rows'),
//     cellSize: state.present.get('cellSize'),
//     paletteGridData: state.present.getIn(['palette', 'grid'])
//   };
// };

// // Mapping dispatch to props
// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   actions: bindActionCreators(actionCreators, dispatch)
// });

// const connector = connect(mapStateToProps, mapDispatchToProps);

// type PropsFromRedux = ConnectedProps<typeof connector>;

// const SaveDrawing: React.FC<PropsFromRedux> = ({ frames, paletteGridData, cellSize, columns, rows, actions }) => {
//   const save = () => {
//     const drawingToSave = {
//       frames,
//       paletteGridData,
//       cellSize,
//       columns,
//       rows,
//       animate: frames.size > 1,
//       id: shortid.generate()
//     };

//     if (saveProjectToStorage(localStorage, drawingToSave)) {
//       actions.sendNotification('Drawing saved');
//     }
//   };

//   return (
//     <div className="save-drawing">
//       <button
//         type="button"
//         onClick={save}
//       >
//         SAVE
//       </button>
//     </div>
//   );
// };

// const SaveDrawingContainer = connector(SaveDrawing);
// export default SaveDrawingContainer;
