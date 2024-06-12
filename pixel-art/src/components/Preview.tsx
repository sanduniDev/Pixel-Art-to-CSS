import React from 'react';
import { generatePixelDrawCss, generateAnimationCSSData } from '../utils/cssParse';
import Animation from './Animation';

interface Frame {
  id: string; 
}

interface StoredData {
  frames: Map<number, Frame>;
  columns: number;
  rows: number;
  cellSize: number;
  animate: boolean;
}

interface PreviewProps {
  activeFrameIndex?: number; 
  duration?: number;
  storedData?: StoredData;
  animationName?: string;
}

const Preview: React.FC<PreviewProps> = props => {
  const generatePreview = () => {
    const { activeFrameIndex, duration, storedData, animationName } = props;
    const { frames, columns, cellSize, animate } = storedData || props;
    const animation = frames.size > 1 && animate;
    let animationData: string | undefined;
    let cssString: string | undefined;

    const styles: { previewWrapper: React.CSSProperties } = {
      previewWrapper: {
        height: `${cellSize}px`,
        width: `${cellSize}px`,
        position: 'absolute',
        top: '-5px',
        left: '-5px'
      }
    };

    if (animation) {
      animationData = generateAnimationCSSData(frames, columns, cellSize);
    } else {
      cssString = generatePixelDrawCss(
        frames.get(activeFrameIndex!),
        columns,
        cellSize,
        'string'
      );

      styles.previewWrapper.boxShadow = cssString;
      styles.previewWrapper.MozBoxShadow = cssString;
      styles.previewWrapper.WebkitBoxShadow = cssString;
    }

    return (
      <div style={animation ? undefined : styles.previewWrapper}>
        {animation ? (
          <Animation
            duration={duration!}
            boxShadow={animationData!}
            name={animationName}
          />
        ) : null}
      </div>
    );
  };

  const { storedData } = props;
  const { columns, rows, cellSize } = storedData || props;
  const style: React.CSSProperties = {
    width: `${columns * cellSize}px`,
    height: `${rows * cellSize}px`,
    position: 'relative'
  };

  return (
    <div className="preview" style={style}>
      {generatePreview()}
    </div>
  );
};

export default Preview;
