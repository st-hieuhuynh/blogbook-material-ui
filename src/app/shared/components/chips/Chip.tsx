import React from 'react';

interface ChipProps {
  value: string;
  onChipDelete?: Function;
}
const Chip = (props: ChipProps) => {
  return (
    <div className="chip">
      <span>{props.value}</span>
      <button
        className="chip-delete"
        type="button"
        onClick={() => {
          props.onChipDelete();
        }}
      >
        <img
          src="../../../../assets/icons/cancel_gray.svg"
          alt="cancel"
          className="chip-delete-img"
        />
      </button>
    </div>
  );
};

export default Chip;
