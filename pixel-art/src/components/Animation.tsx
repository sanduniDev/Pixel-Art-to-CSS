import React from 'react';
import { keyframes } from 'styled-components';

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

  const style: React.CSSProperties = {
    position: 'absolute',
    animation: `${keyframeName} ${duration}s infinite`,
    left: '-5px',
    top: '-5px'
  };

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

const randomString = () => {
  return Math.random().toString(36).substr(2, 9);
};

export default Animation;
