import React from "react";
import Select from "react-select";

const customStyles = {
  dropdownIndicator: () => ({
    backgroundColor: "#fff",
    color: "#c1b1bf",
    width: 36,
    height: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  }),
  indicatorSeparator: () => ({
    display: "none",
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "#000000" : "#555555",
    backgroundColor: "#fff",
    borderRadius: 0,
    padding: 16,
    fontSize: 14,
  }),
  control: () => ({
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 34,
    letterSpacing: "-0.45px",
    // border: "1px solid #c7c7c7",
    // borderRadius: "3px",
    color: "#c1bfbf",
    display: "flex",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

class SelectComp extends React.Component {
  handleChange = (selectedOption) => {
    this.props.onChange(selectedOption);
  };
  render() {
    const { options, placeholder, styles, getOptionLabel, value } = this.props;
    return (
      <Select
        id={this.props.id}
        className={this.props.className}
        styles={styles ? styles : customStyles}
        value={value}
        onChange={this.handleChange}
        getOptionLabel={(option) =>
          getOptionLabel ? getOptionLabel(option) : option.label
        }
        options={options}
        isSearchable={false}
        placeholder={placeholder}
      />
    );
  }
}

export default SelectComp;
