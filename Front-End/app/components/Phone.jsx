'use client';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
export default class PhoneInputGfg extends React.Component {
  constructor(props) {
    super(props);
    this.state = { phone: this.props.value || '' };
    this.phoneInputRef = React.createRef();
    this.className = props.className;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({ phone: this.props.value });
    }
  }
  getPhoneInputValue() {
    return this.state.phone;
  }
  render() {
    const { id, handlePhoneChange } = this.props; // Extracting id and handlePhoneChange from props
    return (
      <div id="phoneInputWrapper">
        <PhoneInput
          ref={this.phoneInputRef}
          // Assigning id to the input
          className={this.className}
          country={'eg'}
          value={this.state.phone}
          onChange={(phone) => {
            this.setState({ phone });
            handlePhoneChange(phone);
          }}
        />
      </div>
    );
  }
}
