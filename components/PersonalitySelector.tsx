

import React from 'react';

interface PersonalitySelectorProps {
  selected: string;
  setSelected: (value: string) => void;
}

const personalities = [
  { label: 'Formal', value: 'formal' },
  { label: 'Friendly', value: 'friendly' },
  { label: 'Humorous', value: 'humorous' },
  { label: 'Empathetic', value: 'empathetic' },
  { label: 'Technical', value: 'technical' }
];

const PersonalitySelector: React.FC<PersonalitySelectorProps> = ({ selected, setSelected }) => {
  return (
    <div>
      <label htmlFor="personality">Chat Personality:</label>
      <select
        id="personality"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
        className="border rounded p-2 mt-2"
      >
        {personalities.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PersonalitySelector;
