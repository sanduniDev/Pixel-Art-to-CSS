import React from 'react';

// Define the types for the props
interface Option {
  value: string;
  labelFor: string;
  id: number;
  description: string;
}

interface RadioSelectorProps {
  name: string;
  selected: string;
  legend?: string;
  options: Option[];
  change: (value: string, name: string) => void;
}

const RadioSelector: React.FC<RadioSelectorProps> = ({ name, selected, legend, options, change }) => {
  const availableOptions = (ops: Option[]) =>
    ops.map(item => (
      <label htmlFor={`${name}-${item.labelFor}`} key={item.id}>
        <input
          type="radio"
          value={item.value}
          name={item.labelFor}
          id={`${name}-${item.labelFor}`}
          onChange={() => change(item.value, name)}
          checked={selected === item.value}
        />
        <span>{item.description}</span>
      </label>
    ));

  return (
    <fieldset className="radio-selector">
      {legend ? <legend>{legend}</legend> : null}
      {availableOptions(options)}
    </fieldset>
  );
};

export default RadioSelector;
