import PropTypes from 'prop-types';
import React from 'react';

function SortDirectionButton({ direction, onChange }) {
  const isAsc = direction === 'asc';
  return (
    <button
      type="button"
      onClick={() => onChange(isAsc ? 'desc' : 'asc')}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        marginLeft: 8,
        padding: 0,
        display: 'flex',
        alignItems: 'center',
      }}
      title={isAsc ? 'Сортировать по убыванию' : 'Сортировать по возрастанию'}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ transform: isAsc ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
        <path
          d="M6 9L9 12L12 9"
          stroke="#fe5f1e"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}

SortDirectionButton.propTypes = {
  direction: PropTypes.oneOf(['asc', 'desc']).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SortDirectionButton;
