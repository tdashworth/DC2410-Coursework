import React from 'react';

interface IOption {
  value: React.OptionHTMLAttributes<HTMLOptionElement>['value'];
  label: string;
}

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  > {
  className?: string;
  id: string;
  label: string;
  icon?: string;
  options: IOption[];
  selectedOption?: IOption['value'];
}

class FormSelect extends React.Component<IProps> {
  public render = () => (
    <div className={`input-group mb-2 ${this.props.className}`}>
      <div className="input-group-prepend">
        <div className="input-group-text">
          {this.props.icon || this.props.label}
        </div>
      </div>
      <label className="sr-only" htmlFor={this.props.id}>
        {this.props.label}
      </label>
      <select {...this.props} className="custom-select" id={this.props.id}>
        {this.props.options.map((option, index) => (
          <option
            key={index}
            value={option.value}
            selected={this.props.selectedOption === option.value}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default FormSelect;
