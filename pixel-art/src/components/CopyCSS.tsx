import React from 'react';
import Output from './Output';
import { getCssImageClassOutput, exportAnimationData } from '../utils/cssParse';

// Define the prop types
interface CopyCSSProps {
  frames: any[]; // Replace 'any' with the actual type if available
  columns: number;
  cellSize: number;
  activeFrameIndex: number;
  animationCode: boolean;
  duration: number;
}

const CopyCSS: React.FC<CopyCSSProps> = ({
  frames,
  columns,
  cellSize,
  activeFrameIndex,
  animationCode,
  duration
}) => {
  const generateCSS = (): string => {
    if (animationCode) {
      const cssAnimationString = exportAnimationData(
        frames,
        columns,
        cellSize,
        duration
      );
      return cssAnimationString;
    }

    return getCssImageClassOutput(
      frames[activeFrameIndex],
      columns,
      cellSize
    );
  };

  return (
    <div className="copy-css">
      {animationCode ? (
        <h2>
          Paste the following code anywhere in the CSS code and assign
          <span> .pixel-animation </span>
          class to a HTML element
        </h2>
      ) : (
        <h2>
          Paste the following code anywhere in the CSS code and assign
          <span> .pixelart-to-css </span>
          class to a HTML element
        </h2>
      )}
      <Output
        copyClipboardData={{
          showButton: true,
          textButton: 'Copy',
          successMessage: 'Copied!'
        }}
        outputText={generateCSS()}
      />
    </div>
  );
};

export default CopyCSS;
