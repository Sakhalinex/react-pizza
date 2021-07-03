import PropTypes from 'prop-types';
import React from 'react';

function SearchInput({ value, onChange }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        background: '#f3f3f3',
        borderRadius: 30,
        padding: '6px 16px',
        minWidth: 200,
      }}>
      <svg
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginRight: 8 }}>
        <path d="M11.7666 11.7666L16 16" stroke="#b6b6b6" strokeWidth="2" strokeLinecap="round" />
        <circle cx="8" cy="8" r="7" stroke="#b6b6b6" strokeWidth="2" />
      </svg>
      <input
        type="text"
        placeholder="Поиск пиццы..."
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          border: 'none',
          outline: 'none',
          background: 'transparent',
          fontSize: 16,
          width: '100%',
        }}
      />
    </div>
  );
}

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SearchInput;
