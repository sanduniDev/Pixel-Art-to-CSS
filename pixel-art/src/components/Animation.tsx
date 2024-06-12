import React from 'react';
import { keyframes } from 'styled-components';
import randomString from '../utils/random';


interface AnimationProps {
  boxShadow: string; 
  duration: number; 
  name?: string; 
}

const Animation: React.FC<AnimationProps> = ({ boxShadow, duration, name }) => {

  const keyframeName = name ?? randomString();

  const KeyFrames = keyframes`
    0% { box-shadow: ${boxShadow}; }
    100% { box-shadow: none; }
  `;

  // Styles for the animation container
  const style: React.CSSProperties = {
    position: 'absolute',
    animation: `${keyframeName} ${duration}s infinite`,
    left: '-5px',
    top: '-5px'
  };

  // Generate CSS for @keyframes
  const animString = `@keyframes ${keyframeName} {
    0% { box-shadow: ${boxShadow}; }
    100% { box-shadow: none; }
  }`;

  return (
    <div>
      <div className="animation-container" style={style} />
      <style>{animString}</style>
    </div>
  );
};

export default Animation;
