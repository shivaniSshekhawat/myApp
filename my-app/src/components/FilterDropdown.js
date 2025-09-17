import React from 'react';
import { FiPaperclip, FiUsers, FiMessageCircle, FiList } from 'react-icons/fi';

const FilterDropdown = ({ filterOptions, enabledFilters, onToggle, onClose }) => {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'paperclip':
        return <FiPaperclip className="filter-icon" />;
      case 'person':
        return <FiUsers className="filter-icon" />;
      case 'chat':
        return <FiMessageCircle className="filter-icon" />;
      case 'list':
        return <FiList className="filter-icon" />;
      default:
        return null;
    }
  };

  return (
    <div className="filter-dropdown">
      {filterOptions.map((option) => (
        <div
          key={option.id}
          className={`filter-option ${option.disabled ? 'disabled' : ''}`}
          role={!option.disabled ? 'button' : undefined}
          tabIndex={!option.disabled ? 0 : undefined}
          onClick={() => { if (!option.disabled) onToggle(option.id); }}
          onKeyDown={(e) => {
            if (!option.disabled && (e.key === 'Enter' || e.key === ' ')) {
              e.preventDefault();
              onToggle(option.id);
            }
          }}
        >
          <div className="filter-option-content">
            {getIcon(option.icon)}
            <span className="filter-option-label">{option.label}</span>
          </div>
          <div className="toggle-switch" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              id={option.id}
              checked={!!enabledFilters[option.id]}
              onChange={() => !option.disabled && onToggle(option.id)}
              className="toggle-input"
              disabled={!!option.disabled}
            />
            <label htmlFor={option.id} className={`toggle-label ${option.disabled ? 'disabled' : ''}`} onClick={(e) => e.stopPropagation()}>
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilterDropdown;
