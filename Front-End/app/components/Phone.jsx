"use client";
import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

export default class PhoneInputGfg extends React.Component {
  constructor(props) {
    super(props);
    this.state = { phone: "" };
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.phoneInputRef = React.createRef();
  }

  handlePhoneChange(phone) {
    this.setState({ phone });
  }

  getPhoneInputValue() {
    return this.state.phone;
  }
  render() {
    const { id } = this.props; // Extracting id from props
    return (
      <div id="phoneInputWrapper">
        <PhoneInput
          ref={this.phoneInputRef}
          // Assigning id to the input
          country={"eg"}
          value={this.state.phone}
          onChange={(phone) => this.setState({ phone })}
        />
      </div>
    );
  }
}
