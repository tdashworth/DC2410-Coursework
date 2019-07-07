import React from 'react';

interface IProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > {
  className?: string;
  id: string;
  label: string;
  icon?: string;
}

class FormTextArea extends React.Component<IProps> {
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
      <textarea
        {...this.props}
        id={this.props.id}
        className="form-control"
        aria-label={this.props.label}
      />
    </div>
  );
}

export default FormTextArea;
