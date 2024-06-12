import React, { useRef, useState } from 'react';

interface CopyClipboardData {
  showButton?: boolean;
  textButton?: string;
  successMessage?: string;
}

interface OutputProps {
  copyClipboardData?: CopyClipboardData;
  readOnly?: boolean;
  outputText: string; // Assuming outputText is required
  preFormatted?: boolean;
}

const Output: React.FC<OutputProps> = ({
  copyClipboardData = {},
  readOnly = true,
  outputText,
  preFormatted = false
}) => {
  const { showButton, textButton, successMessage } = copyClipboardData;
  const [copySuccess, setCopySuccess] = useState<string>('');
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = (e: React.MouseEvent<HTMLButtonElement>) => {
    const textarea = textAreaRef.current;
    if (textarea) {
      textarea.select();
      document.execCommand('copy');
      e.currentTarget.focus();
      setCopySuccess(successMessage || 'Copied!');
    }
  };

  return (
    <div className="output">
      {showButton && document.queryCommandSupported('copy') && (
        <div className="copy-to-clipboard__container">
          <button
            className="copy-to-clipboard"
            type="button"
            onClick={copyToClipboard}
          >
            {textButton || 'Copy'}
          </button>
          <span className={copySuccess ? 'show' : ''}>{copySuccess}</span>
        </div>
      )}
      <textarea
        className={`output__text ${preFormatted ? 'output__pre' : ''}`}
        ref={textAreaRef}
        readOnly={readOnly}
        value={outputText}
      />
    </div>
  );
};

export default Output;
