// tslint:disable-next-line: import-name
import React from 'react';

interface IProps {
  symbol: string;
  label?: string;
}

class Emoji extends React.Component<IProps> {
  public render = () => (
    <span
      className="emoji"
      role="img"
      aria-label={this.props.label ? this.props.label : ''}
      aria-hidden={this.props.label ? 'false' : 'true'}
    >
      {this.props.symbol}
    </span>
  )
}

export default Emoji;
