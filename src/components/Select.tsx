import React, { ChangeEvent, useState } from 'react';

interface SelectProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const Select: React.FC<SelectProps> = ({ name, value, onChange }) => {
  const [tier, setTier] = useState(value);

  const handleTier = (e: ChangeEvent<HTMLSelectElement>) => {
    setTier(e.target.value);
    onChange(e);
  };

  return (
    <div className='flex'>
      <select className='myselects' name={name} value={tier} onChange={handleTier}>
        <option defaultValue="OU">OU</option>
        <option value="UU">UU</option>
        <option value="NU">NU</option>
        <option value="Doubles">Doubles</option>
        <option value="LC">LC</option>
      </select>
    </div>
  );
};

export default Select;
