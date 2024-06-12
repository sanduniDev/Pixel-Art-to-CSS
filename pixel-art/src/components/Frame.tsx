import React, { Component, ChangeEvent } from 'react';
import { List } from 'immutable';
import { Draggable, DraggableProvided } from 'react-beautiful-dnd';
import Preview from './Preview';
import { FrameData, Actions } from '../store/types'; // Import or define the types for FrameData and Actions

interface FrameProps {
  active: boolean;
  dataId: number;
  frame: FrameData;
  lastFrame: boolean;
  columns: number;
  rows: number;
  actions: Actions;
}

class Frame extends Component<FrameProps> {
  private percentage: HTMLInputElement | null = null;

  handleClick = () => {
    const { actions, dataId } = this.props;
    actions.changeActiveFrame(dataId);
  };

  deleteFrame = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { active, actions, dataId } = this.props;
    e.stopPropagation();
    if (active) {
      actions.deleteFrame(dataId);
    }
  };

  duplicateFrame = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { active, actions, dataId } = this.props;
    e.stopPropagation();
    if (active) {
      actions.duplicateFrame(dataId);
    }
  };

  changeInterval = (e: ChangeEvent<HTMLInputElement>) => {
    const { active, actions, dataId } = this.props;
    e.stopPropagation();
    if (active && this.percentage) {
      actions.changeFrameInterval(dataId, Number(this.percentage.value));
    }
  };

  render() {
    const { active, dataId, frame, lastFrame, columns, rows } = this.props;
    return (
      <Draggable key={dataId} draggableId={dataId.toString()} index={dataId}>
        {(provided: DraggableProvided) => (
          <div
            className={`frame${active ? ' active' : ''}`}
            onClick={this.handleClick}
            onKeyPress={this.handleClick}
            role="button"
            tabIndex={0}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <Preview
              frames={List([frame])}
              columns={columns}
              rows={rows}
              cellSize={2}
              activeFrameIndex={0}
            />
            <button
              type="button"
              aria-label="Delete Frame"
              className="delete"
              onClick={this.deleteFrame}
            />
            <button
              type="button"
              aria-label="Duplicate Frame"
              className="duplicate"
              onClick={this.duplicateFrame}
            />
            <input
              type="number"
              value={frame.get('interval')}
              onChange={this.changeInterval}
              className="frame__percentage"
              ref={c => {
                this.percentage = c;
              }}
              disabled={lastFrame || !active}
            />
          </div>
        )}
      </Draggable>
    );
  }
}

export default Frame;
