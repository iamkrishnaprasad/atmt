/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Label } from 'reactstrap';
import { clearSearchProduct } from '../../redux';

function AutoComplete({ id = '', minLength = 0, options, labelKey = 'name', onClick, onInput, label = '', placeholder = '' }) {
  const dispatch = useDispatch();
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [activeOptionIndex, setActiveOptionIndex] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [input, setInput] = useState('');

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);

    if (minLength <= value?.length) {
      onInput(value);
      // Filter our options that don't contain the user's input
      const unLinked = options.filter((option) => option[labelKey]?.toLowerCase()?.indexOf(value?.toLowerCase()) > -1);

      setFilteredOptions(unLinked);
      setActiveOptionIndex(0);
      setShowOptions(true);
    } else {
      setFilteredOptions([]);
      setActiveOptionIndex(0);
      setShowOptions(false);
    }
  };

  const handleClick = (e, data) => {
    onClick(data);
    dispatch(clearSearchProduct());
    setFilteredOptions([]);
    setInput('');
    setActiveOptionIndex(0);
    setShowOptions(false);
  };

  const onKeyDown = (e) => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      setInput(filteredOptions[activeOptionIndex]);
      setActiveOptionIndex(0);
      setShowOptions(false);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeOptionIndex === 0) {
        return;
      }
      setActiveOptionIndex(activeOptionIndex - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeOptionIndex - 1 === filteredOptions.length) {
        return;
      }
      setActiveOptionIndex(activeOptionIndex + 1);
    }
  };

  function OptionsListComponent() {
    return filteredOptions.length ? (
      <ul className="suggestions">
        {filteredOptions.map((option, index) => (
          <li className={index === activeOptionIndex ? 'suggestion-active' : null} key={index} onClick={(e) => handleClick(e, option)}>
            {option[labelKey]}
          </li>
        ))}
      </ul>
    ) : (
      <div className="no-suggestions">
        <em>No product found.</em>
      </div>
    );
  }

  return (
    <>
      {label.length ? <Label for={id}>{label}</Label> : null}
      <Input type="text" id={id} onChange={onChange} onKeyDown={onKeyDown} value={input} placeholder={placeholder} autoComplete="off" />
      {showOptions && input && <OptionsListComponent />}
    </>
  );
}

export default AutoComplete;
