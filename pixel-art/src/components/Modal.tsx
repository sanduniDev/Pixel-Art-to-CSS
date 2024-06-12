import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import ModalReact from 'react-modal';
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks
} from 'body-scroll-lock';
import * as actionCreators from '../store/actions/actionCreators';

import RadioSelector from './RadioSelector';
import LoadDrawing from './LoadDrawing';
import Preview from './Preview';
import CopyCSS from './CopyCSS';
import DownloadDrawing from './DownloadDrawing';
import KeyBindingsLegend from './KeyBindingsLegend';
import { RootState } from '../store/reducers'; // Adjust the path as needed

interface ModalProps extends PropsFromRedux {
  isOpen: boolean;
  type: string;
}

interface ModalState {
  previewType: string;
  loadType: string;
}

class Modal extends React.Component<ModalProps, ModalState> {
  private modalBodyRef: React.RefObject<HTMLDivElement>;
  private modalContainerRef: React.RefObject<HTMLDivElement>;

  constructor(props: ModalProps) {
    super(props);
    this.state = {
      previewType: 'single',
      loadType: 'storage'
    };
    this.modalBodyRef = React.createRef();
    this.modalContainerRef = React.createRef();
    ModalReact.setAppElement('body');
  }

  static generateRadioOptions(props: ModalProps) {
    let options;

    if (props.type !== 'load') {
      options = [
        {
          value: 'single',
          description: 'single',
          labelFor: 'single',
          id: 3
        }
      ];

      if (props.frames.size > 1) {
        const spritesheetSupport = props.type === 'download' || props.type === 'twitter';
        const animationOptionLabel = spritesheetSupport ? 'GIF' : 'animation';

        const animationOption = {
          value: 'animation',
          description: animationOptionLabel,
          labelFor: animationOptionLabel,
          id: 4
        };
        options.push(animationOption);

        if (spritesheetSupport) {
          options.push({
            value: 'spritesheet',
            description: 'spritesheet',
            labelFor: 'spritesheet',
            id: 5
          });
        }
      }
    } else {
      options = [
        {
          value: 'storage',
          description: 'Stored',
          labelFor: 'stored',
          id: 0
        },
        {
          value: 'loadImgFile',
          description: 'Load From Image',
          labelFor: 'load-img-file',
          id: 1
        },
        {
          value: 'import',
          description: 'Import',
          labelFor: 'import',
          id: 2
        },
        {
          value: 'export',
          description: 'Export',
          labelFor: 'export',
          id: 3
        },
        {
          value: 'extractData',
          description: 'Useful Data',
          labelFor: 'useful-data',
          id: 4
        }
      ];
    }

    return options;
  }

  componentWillUnmount() {
    clearAllBodyScrollLocks();
  }

  showModal = () => disableBodyScroll(this.modalContainerRef.current!);
  closeModal = () => {
    enableBodyScroll(this.modalContainerRef.current!);
    this.props.close();
  };
  scrollTop = () => this.modalBodyRef.current?.scrollTo(0, 0);
  changeRadioType = (value: string, type: string) => {
    const newState: Partial<ModalState> = {};
    this.scrollTop();
    switch (type) {
      case 'load-type':
        newState.loadType = value;
        break;
      default:
        newState.previewType = value;
    }
    this.setState(newState as ModalState);
  };

  getModalContent(props: ModalProps) {
    const { previewType, loadType } = this.state;
    const options = Modal.generateRadioOptions(props);
    let content;
    const previewBlock = (
      <>
        {previewType !== 'spritesheet' && (
          <div className="modal__preview--wrapper">
            <Preview
              key="0"
              frames={props.frames}
              columns={props.columns}
              rows={props.rows}
              cellSize={props.type === 'preview' ? props.cellSize : 5}
              duration={props.duration}
              activeFrameIndex={props.activeFrameIndex}
              animate={previewType === 'animation'}
            />
          </div>
        )}
      </>
    );
    const isLoadModal = props.type === 'load';
    const radioType = isLoadModal ? 'load' : 'preview';
    let radioOptions = (
      <div className={`modal__${radioType}`}>
        <RadioSelector
          name={`${radioType}-type`}
          selected={isLoadModal ? loadType : previewType}
          change={this.changeRadioType}
          options={options}
        />
      </div>
    );

    switch (props.type) {
      case 'load':
        content = (
          <LoadDrawing
            loadType={loadType}
            close={this.closeModal}
            open={props.open}
            frames={props.frames}
            columns={props.columns}
            rows={props.rows}
            cellSize={props.cellSize}
            paletteGridData={props.paletteGridData}
            actions={{
              setDrawing: props.actions.setDrawing,
              sendNotification: props.actions.sendNotification
            }}
          />
        );
        break;
      case 'copycss':
        content = (
          <>
            {previewBlock}
            <CopyCSS
              frames={props.frames}
              columns={props.columns}
              rows={props.rows}
              cellSize={props.cellSize}
              activeFrameIndex={props.activeFrameIndex}
              animationCode={previewType !== 'single'}
              duration={props.duration}
            />
          </>
        );
        break;
      case 'download':
        content = (
          <>
            {previewBlock}
            <DownloadDrawing
              frames={props.frames}
              activeFrame={props.activeFrame}
              columns={props.columns}
              rows={props.rows}
              cellSize={props.cellSize}
              duration={props.duration}
              downloadType={previewType}
              actions={{ sendNotification: props.actions.sendNotification }}
            />
          </>
        );
        break;
      case 'keybindings':
        content = (
          <>
            <KeyBindingsLegend />
          </>
        );
        radioOptions = null;
        break;
      default:
        content = <>{previewBlock}</>;
        break;
    }

    return (
      <div className="modal">
        <div className="modal__header">
          <button type="button" className="close" onClick={this.closeModal}>
            x
          </button>
        </div>
        {radioOptions}
        <div className="modal__body" ref={this.modalBodyRef}>
          {content}
        </div>
      </div>
    );
  }

  render() {
    const { isOpen, type } = this.props;
    const styles = {
      content: {
        overflow: 'hidden',
        display: 'flex'
      }
    };

    return (
      <ModalReact
        isOpen={isOpen}
        onRequestClose={this.closeModal}
        onAfterOpen={this.showModal}
        ref={this.modalContainerRef}
        style={styles}
        contentLabel={`Dialog ${type || ''}`}
      >
        {this.getModalContent(this.props)}
      </ModalReact>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  const frames = state.present.get('frames');
  const activeFrameIndex = frames.get('activeIndex');
  return {
    frames: frames.get('list'),
    activeFrameIndex,
    activeFrame: frames.getIn(['list', activeFrameIndex]),
    paletteGridData: state.present.getIn(['palette', 'grid']),
    columns: frames.get('columns'),
    rows: frames.get('rows'),
    cellSize: state.present.get('cellSize'),
    duration: state.present.get('duration')
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const ModalContainer = connector(Modal);
export default ModalContainer;
