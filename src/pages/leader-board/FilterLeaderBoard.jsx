import Select from 'react-select';
import { useColorMode, useTheme } from '@chakra-ui/react';

function FilterLeaderBoard({ placeholder, handleChange, optionDropdown, ...props }) {
  const { colorMode } = useColorMode();
  const Theme = useTheme();

  const customStyles = {
    option: (provided) => ({
      ...provided
      // color: 'red'
    }),
    control: (base, state) => ({
      ...base,
      background: colorMode === 'dark' ? Theme.colors.dark.light : 'white',
      color: colorMode === 'dark' ? 'red' : 'white',
      borderRadius: state.isFocused ? '3px 3px 0 0' : 3,
      boxShadow: state.isFocused ? null : null,
      borderColor: colorMode === 'dark' && Theme.colors.secondary.base,
      '&:hover': {
        cursor: 'text'
      }
    }),
    menuList: (base) => ({
      ...base,
      background: colorMode === 'dark' ? Theme.colors.dark.light : 'white',
      // kill the white space on first and last option
      padding: 0
    }),
    singleValue: (provided) => ({
      ...provided,
      color: colorMode === 'dark' ? 'white' : Theme.colors.primary.base
    }),
    placeholder: (defaultStyles) => {
      return {
        ...defaultStyles,
        color: colorMode === 'dark' ? 'white' : Theme.colors.secondary.base
      };
    }
  };
  const themeSelectConfig = (theme) => ({
    ...theme,
    borderRadius: '4px',
    colors: {
      ...theme.colors,
      primary50: Theme.colors.primary.base,
      // primary25: '#d6d3ff',
      primary25: colorMode ? Theme.colors.primary.light : '#ffffff',
      primary: colorMode ? Theme.colors.primary.base : 'red'
    }
  });
  return (
    <>
      <Select
        onChange={handleChange}
        options={optionDropdown}
        placeholder={placeholder}
        theme={themeSelectConfig}
        styles={customStyles}
        {...props}
      />
    </>
  );
}

export default FilterLeaderBoard;
