import React from 'react';
import { fromJS, List, Map } from 'immutable';
import Preview from './Preview';
import Output from './Output';
import UsefulData from './UsefulData';
import LoadFromFile from './LoadFromFile';
import {
  getDataFromStorage,
  removeProjectFromStorage,
  generateExportString,
  exportedStringToProjectData
} from '../utils/storage';

interface ProjectData {
  frames: List<Map<any, any>>;
  paletteGridData: List<Map<any, any>>;
  cellSize: number;
  columns: number;
  rows: number;
  animate?: boolean;
  id?: string;
}

interface LoadDrawingProps {
  frames: List<Map<any, any>>;
  paletteGridData: List<Map<any, any>>;
  cellSize: number;
  columns: number;
  rows: number;
  actions: {
    setDrawing: (frames: List<Map<any, any>>, paletteGridData: List<Map<any, any>>, cellSize: number, columns: number, rows: number) => void;
    sendNotification: (message: string) => void;
  };
  close: () => void;
  open?: () => void;
  loadType: 'import' | 'export' | 'extractData' | 'loadImgFile' | string;
}

export default class LoadDrawing extends React.Component<LoadDrawingProps> {
  private importProjectData = React.createRef<HTMLTextAreaElement>();
  private browserStorage: Storage | null = typeof localStorage === 'undefined' ? null : localStorage;

  getExportCode = (): string => {
    const { frames, paletteGridData, cellSize, columns, rows } = this.props;
    const projectData: ProjectData = {
      frames,
      paletteGridData,
      cellSize,
      columns,
      rows,
      animate: frames.size > 1
    };
    return generateExportString(projectData);
  };

  importProject = (): void => {
    const importedProject = exportedStringToProjectData(
      this.importProjectData.current?.value || ''
    );
    const { actions, close } = this.props;

    if (importedProject) {
      const { frames, paletteGridData, columns, rows, cellSize } = importedProject;
      actions.setDrawing(frames, paletteGridData, cellSize, columns, rows);
      close();
      actions.sendNotification('Project successfully imported');
    } else {
      actions.sendNotification("Sorry, the project couldn't be imported");
    }
  };

  removeFromStorage = (key: string, e: React.MouseEvent): void => {
    const { actions, open, close } = this.props;
    e.stopPropagation();
    if (this.browserStorage) {
      const removed = removeProjectFromStorage(this.browserStorage, key);
      if (removed) {
        actions.sendNotification('Drawing deleted');
        close();
        if (open) {
          open();
        }
      }
    }
  };

  drawingClick = (data: ProjectData): void => {
    const { actions, close } = this.props;
    actions.setDrawing(
      data.frames,
      data.paletteGridData,
      data.cellSize,
      data.columns,
      data.rows
    );
    close();
  };

  giveMeDrawings = (): JSX.Element[] => {
    if (this.browserStorage) {
      const dataStored = getDataFromStorage(this.browserStorage);
      if (dataStored && dataStored.stored.length > 0) {
        return dataStored.stored.map((data, i) => {
          const elem: ProjectData = {
            animate: data.animate,
            cellSize: 5, // Unify cell size for load preview
            columns: data.columns,
            frames: fromJS(data.frames), // Parse to immutable
            paletteGridData: fromJS(data.paletteGridData),
            rows: data.rows,
            id: data.id
          };

          return (
            <div
              key={elem.id}
              onClick={() => {
                this.drawingClick(elem);
              }}
              onKeyPress={() => {
                this.drawingClick(elem);
              }}
              className="load-drawing__drawing"
              role="button"
              tabIndex={0}
            >
              <Preview
                key={elem.id}
                storedData={elem}
                activeFrameIndex={0}
                duration={1}
              />
              <button
                type="button"
                aria-label="Remove stored project"
                className="drawing__delete"
                onClick={(event) => {
                  this.removeFromStorage(i.toString(), event);
                }}
              />
            </div>
          );
        });
      }
    }
    return [];
  };

  giveMeOptions = (type: string): JSX.Element => {
    switch (type) {
      case 'import':
        return (
          <div className="load-drawing">
            <h2>Import your project</h2>
            <p>
              Paste a previously exported code in the text field and click on the button &nbsp;
              <b>IMPORT</b>
              &nbsp;
            </p>
            <textarea
              className="load-drawing__import"
              ref={this.importProjectData}
              defaultValue=""
            />
            <button
              type="button"
              className="import__button"
              onClick={this.importProject}
            >
              IMPORT
            </button>
          </div>
        );
      case 'export':
        return (
          <div className="load-drawing">
            <h2>Export your project</h2>
            <p>
              Please save the following text if you wish to import your project
              in the future using the &nbsp;
              <b>Import</b>
              &nbsp; button.
            </p>
            <p>
              In the main page you can save your project by clicking on the
              &nbsp;
              <b>SAVE</b>
              &nbsp; button, it will keep your work in your browser&apos;s local
              storage. However, if you prefer not to use local storage or you
              just want to keep your project safe somewhere else, this might be
              a good option.
            </p>
            <Output
              copyClipboardData={{
                showButton: true,
                textButton: 'Copy',
                successMessage: 'Copied!'
              }}
              outputText={`${this.getExportCode()}\n\n`}
            />
          </div>
        );
      case 'extractData':
        const { frames, columns } = this.props;
        return <UsefulData frames={frames} columns={columns} />;
      case 'loadImgFile':
        const { actions, frames, columns, close } = this.props;
        return (
          <LoadFromFile
            frames={frames}
            columns={columns}
            actions={actions}
            close={close}
          />
        );
      default:
        const drawings = this.giveMeDrawings();
        const drawingsStored = drawings.length > 0;
        return (
          <div className="load-drawing">
            <h2>Select one of your projects stored in the browser</h2>
            <div
              className={`load-drawing__container
                ${!drawingsStored ? 'empty' : ''}`}
            >
              {drawingsStored ? drawings : 'Nothing awesome yet...'}
            </div>
          </div>
        );
    }
  };

  render() {
    const { loadType } = this.props;
    return this.giveMeOptions(loadType);
  }
}
