import React, { useState } from 'react';

import Chip from './Chip';
interface ChipInputProps {
  value: string[];
  setValue: Function;
  placeholder?: string;
}
enum KEY_CODE {
  BACKSPACE = 8,
  TAB = 9,
  ENTER = 13,
}
const ChipInput = (props: ChipInputProps) => {
  const chips = props.value;
  const setChips = props.setValue;
  const [inputValue, setInputValue] = useState('');
  const handleKeyDown = (e) => {
    let keyPressed = e.which;
    if (
      (keyPressed === KEY_CODE.ENTER || keyPressed === KEY_CODE.TAB) &&
      e.target.value
    ) {
      e.preventDefault();
      addChip(e.target.value);
    } else if (keyPressed === KEY_CODE.BACKSPACE) {
      if (!e.target.value && chips.length) {
        deleteChip(chips.length - 1);
      }
    }
  };
  const handleChange = (e) => {
    setInputValue(e.target.value);
  };
  const addChip = (chip) => {
    setInputValue('');
    setChips([...chips, chip]);
  };
  const deleteChip = (index) => {
    let newChips = [...chips];
    newChips.splice(index, 1);
    setChips(newChips);
  };
  const resetChips = () => {
    setInputValue('');
    setChips([]);
  };
  return (
    <label htmlFor="chips" className="chips-input-container">
      {chips.map((chip, idx) => {
        return (
          <Chip
            value={chip}
            key={idx}
            onChipDelete={() => {
              deleteChip(idx);
            }}
          />
        );
      })}
      <div className="chips-input">
        <input
          id="chips"
          className="text-input"
          type="text"
          placeholder={props.placeholder || 'Add item'}
          value={inputValue}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className="chip-delete" type="button" onClick={resetChips}>
          <img
            src="../../../../assets/icons/clear_black.svg"
            alt="clear"
            className="chip-delete-img"
          />
        </button>
      </div>
    </label>
  );
};

export default ChipInput;
