import React from 'react';
import styled from 'styled-components';
import ImageSizeDisplay from './ImageSizeDisplay';

// Styled component remains the same
const ImageSizeSection = styled.div`
  background-color: whitesmoke;
  padding: 1rem 1rem;
`;

// Define TypeScript interfaces for the props
interface Dimension {
  w: number;
  h: number;
}

interface ValidationError {
  widthError?: string;
  heightError?: string;
}

interface ImageDimensionsProps {
  imageDimensions: Dimension;
  resultDimensions: Dimension;
  validationError: ValidationError;
}

// Convert functional component to use TypeScript
const ImageDimensions: React.FC<ImageDimensionsProps> = ({
  imageDimensions,
  resultDimensions,
  validationError
}) => (
  <ImageSizeSection>
    <ImageSizeDisplay
      description="Original:"
      width={{ value: imageDimensions.w }}
      height={{ value: imageDimensions.h }}
    />
    <ImageSizeDisplay
      description="Frame size:"
      width={{
        value: resultDimensions.w,
        error: validationError.widthError
      }}
      height={{
        value: resultDimensions.h,
        error: validationError.heightError
      }}
    />
  </ImageSizeSection>
);

export default ImageDimensions;
