import React, { ChangeEvent } from 'react';

// Define an interface for the component props
interface CheckboxProps {
  name: string;
  labelFor: string;
  checked: boolean;
  description: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Checkbox: React.FC<CheckboxProps> = ({ name, labelFor, checked, description, onChange }) => (
  <div className="checkbox">
    <label htmlFor={`${name}-${labelFor}`}>
      <input
        type="checkbox"
        checked={checked}
        name={labelFor}
        id={`${name}-${labelFor}`}
        onChange={onChange}
      />
      <span>{`[${checked ? 'X' : ' '}] ${description}`}</span>
    </label>
  </div>
);

export default Checkbox;
