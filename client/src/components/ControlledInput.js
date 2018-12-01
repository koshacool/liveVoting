import _ from 'lodash';
import React, { Component } from 'react'; 
import { string, func, number } from 'prop-types';
import { Input } from 'reactstrap';

class ControlledInput extends Component {
  state = {
    value: this.props.value,
  };

  onChangeDebounced = _.debounce(this.props.onChange, this.props.delay);

  // componentWillReceiveProps(newProps) {
  //   const { value } = this.state;
  //   if (value !== newProps.value) {
  //     this.setState({ value: newProps.value });
  //   }
  // }

  onChange = ({ target }) => {
    const { value, name, checked } = target;

    this.setState({ value });
    this.onChangeDebounced({ target: { value, name, checked } });
  }

  render() {
    const { type, name, id, placeholder } = this.props;
    const { value } = this.state;

    return (
      <Input
        id={id}
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        onChange={this.onChange}
      />
    );
  }
}

ControlledInput.propTypes = {
  id: string.isRequired,
  type: string.isRequired,
  name: string.isRequired,
  onChange: func.isRequired,
  placeholder: string.isRequired,
  value: string,
  delay: number,
}

ControlledInput.defaultProps = {
  value: '',
  delay: 400,
}

export default ControlledInput;