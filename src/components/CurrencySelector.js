import React from "react";
import Select, { components } from "react-select";
import { SelectCustomOption } from "./SelectCustomOption";

export const CustomComponent = (Comp) => (props) => {
  return (
    <Comp {...props}>
      <SelectCustomOption {...props.data} />
    </Comp>
  );
};

export class CurrencySelector extends React.Component {
  static displayName = "CurrencySelector";
  handleChange = (selectedOption) => {
    this.props.onChange(selectedOption);
  };
  render() {
    const { label, options = [], value } = this.props;
    return (
      <label>
        {label && <div className="label">{`${label}:`}</div>}
        <Select
          className="react-select-container"
          isClearable={true}
          value={value}
          onChange={this.handleChange}
          options={options}
          components={{
            Option: CustomComponent(components.Option),
            SingleValue: CustomComponent(components.SingleValue),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 2,
            colors: {
              ...theme.colors,
              primary50: "gold",
              primary25: "gold",
              primary: "gold",
              neutral60: "black",
              neutral40: "darkslategray",
              neutral30: "darkslategray",
              neutral20: "darkslategray",
            },
          })}
        />
      </label>
    );
  }
}
