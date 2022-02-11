/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/no-unstable-nested-components */
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Input, Spinner } from 'reactstrap';
import classNames from 'classnames';
import { clearSearchProduct } from '../../redux';
import styles from '../../components/Tables/Tables.module.scss';

function AutoComplete({ minLength = 0, options, labelKey = 'name', onClick, onInput, placeholder = '', loading }) {
  const dispatch = useDispatch();
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [showOptions, setShowOptions] = useState(false);
  const [input, setInput] = useState('');

  useEffect(() => {
    setFilteredOptions(options);
  }, [options, loading]);

  const onChange = (e) => {
    const { value } = e.target;
    setInput(value);

    if (minLength <= value?.length) {
      onInput(value);
      // Filter our options that don't contain the user's input
      const unLinked = options.filter((option) => option[labelKey]?.toLowerCase()?.indexOf(value?.toLowerCase()) > -1);

      setFilteredOptions(unLinked);
      setShowOptions(true);
    } else {
      setFilteredOptions([]);
      setShowOptions(false);
    }
  };

  const handleClick = (e, data) => {
    onClick(data);
    setFilteredOptions([]);
    setInput('');
    setShowOptions(false);
    dispatch(clearSearchProduct());
  };

  function OptionsListComponent() {
    return filteredOptions.length ? (
      <ul className={classNames(styles.optionsList, styles.scrollable)}>
        {filteredOptions.map((option, index) => (
          <li key={index} onClick={(e) => handleClick(e, option)}>
            {option.productId.replace('PRODT', '')} - {option.name}
          </li>
        ))}
      </ul>
    ) : null;
  }

  return (
    <div style={{ position: 'relative' }}>
      <Input
        type="text"
        id="searchInputField"
        onPaste={(e) => {
          e.preventDefault();
          return false;
        }}
        onCopy={(e) => {
          e.preventDefault();
          return false;
        }}
        onChange={onChange}
        value={input}
        placeholder={placeholder}
        autoComplete="off"
      />
      {loading ? (
        <Spinner style={{ width: '1.5rem', height: '1.5rem', position: 'absolute', right: '6px', top: '6px', cursor: 'text' }} />
      ) : null}
      {showOptions && input && <OptionsListComponent />}
    </div>
  );
}

export default AutoComplete;
