import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

const DropdownContainer = styled.div`
  position: relative;
`;

const Select = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  background-color: #243744;
  color: white;
  font-size: 16px;
  cursor: pointer;
`;

const DropdownIcon = styled(FontAwesomeIcon)`
  margin-left: auto;
  transition: transform 0.3s ease;
  transform: ${({ isOpen }) => (isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const OptionsContainer = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: #243744;
  border-radius: 4px;
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
`;

const Option = styled.div`
  padding: 8px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: antiquewhite;
  }
`;

function CustomDropdown({ options, selectedCategory, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue) => {
    onSelect(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <DropdownContainer ref={containerRef}>
      <Select onClick={handleToggle}>
        {selectedCategory}
        <DropdownIcon icon={faAngleDown} isOpen={isOpen} />
      </Select>
      <OptionsContainer isOpen={isOpen}>
        {options.map((option) => (
          <Option
            key={option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </Option>
        ))}
      </OptionsContainer>
    </DropdownContainer>
  );
}

export default CustomDropdown;
 