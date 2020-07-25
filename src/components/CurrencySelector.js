import React from "react";
import Select, { components } from "react-select";
import { SelectCustomOption } from "./SelectCustomOption";
const { Option, SingleValue } = components;

// export const CurrencySelector = ({ label, options, value, onChange }) => {
//   return (
//     <label>
//       {`${label}:`}
//       <select id="currency-select" name="currencies" value={value} onChange={onChange}>
//         {options.map((option) =>
//           <option key={option} data-content={`<i className="currency-flag currency-flag-${option.toLowerCase()}"></i>`}>
//             {option}
//           </option>
//         )}
//       </select>
//     </label>
//   );
// };

const SelectIconOption = (props) => (
  <Option {...props}>
    <SelectCustomOption {...props.data} />
  </Option>
);

const SelectValueOption = (props) => (
  <SingleValue {...props}>
    <SelectCustomOption {...props.data} />
  </SingleValue>
);

export class CurrencySelector extends React.Component {
  state = {
    selectedOption: null,
  };
  handleChange = selectedOption => {
    this.setState(
      { selectedOption },
      () => console.log(`Option selected:`, this.state.selectedOption)
    );
  };
  render() {
    const { selectedOption } = this.state;
    const { label, options = [] } = this.props;

    return (
      <label>
        <div className="label">{`${label}:`}</div>
        <Select
          className="react-select-container"
          isClearable={true}
          value={selectedOption}
          onChange={this.handleChange}
          options={options}
          components={{
            Option: SelectIconOption,
            SingleValue: SelectValueOption,
          }}
          theme={theme => ({
            ...theme,
            borderRadius: 2,
            colors: {
              ...theme.colors,
              primary50: 'lightgrey',
              primary25: 'lightgrey',
              primary: 'grey',
            },
          })}
        />
      </label>
    );
  }
}
