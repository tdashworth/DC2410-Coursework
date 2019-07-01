// tslint:disable-next-line: import-name
import React from 'react';

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  className?: string;
  id: string;
  label: string;
  icon: string;
  type: string;
}

class FormInput extends React.Component<IProps> {
  public render = () => (
    <div className={this.props.className}>
      <label className="sr-only" htmlFor={this.props.id}>
        {this.props.label}
      </label>
      <div className="input-group mb-2">
        <div className="input-group-prepend input-group-text">
          {this.props.icon}
        </div>
        <input
          {...this.props}
          type={this.props.type}
          className="form-control"
          id={this.props.id}
          placeholder={this.props.label}
        />
      </div>
    </div>
  )
}

export default FormInput;
