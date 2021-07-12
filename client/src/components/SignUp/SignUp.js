import React, { Component } from "react";
import "./SignUp.css";
import axios from "axios";

/**
 * Sign up component that handles creating a user and adding them into the database.
 *
 * @version 1.0.1
 * @author [Emily Costello] (https://github.com/ecostello9)
 * @author [Abhinav Joshi] (https://github.com/abhijoshi2000)
 */
class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      password: "",
      passwordC: "",
    };
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
  }

  // Axios is used to handle requests to backend endpoints --> Here we use a POST request
  // with the user's inputted name, email and password
  handleSignUp() {
    axios.post("http://localhost:5000/auth/signup", {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
    });
    this.props.handler();
  }

  // Updates dynamically when user inputs email
  async handleNameChange(e) {
    const oldEmail = this.state.email;
    const oldPassword = this.state.password;
    const oldConfirmPass = this.state.passwordC;
    await this.setState({
      name: e.target.value,
      email: oldEmail,
      password: oldPassword,
      passwordC: oldConfirmPass,
    });
  }

  // Updates dynamically when user inputs password
  async handleEmailChange(e) {
    const oldName = this.state.name;
    const oldPassword = this.state.password;
    const oldConfirmPass = this.state.passwordC;
    await this.setState({
      name: oldName,
      email: e.target.value,
      password: oldPassword,
      passwordC: oldConfirmPass,
    });
  }

  // Updates dynamically when user inputs email
  async handlePasswordChange(e) {
    const oldName = this.state.name;
    const oldEmail = this.state.email;
    const oldConfirmPass = this.state.passwordC;
    await this.setState({
      name: oldName,
      email: oldEmail,
      password: e.target.value,
      passwordC: oldConfirmPass,
    });
  }

  // Updates dynamically when user inputs password
  async handleConfirmPasswordChange(e) {
    const oldName = this.state.name;
    const oldEmail = this.state.email;
    const oldPassword = this.state.password;
    await this.setState({
      name: oldName,
      email: oldEmail,
      password: oldPassword,
      passwordC: e.target.value,
    });
    if (this.state.password !== this.state.passwordC) {
      return (
        <label className="password-match-error">Passwords do not match</label>
      );
    }
  }

  render() {
    return (
      <div className="screen">
        <div id="e86_14">
          <div id="e86_15">
            <a className="icon-envelope" id="icon-envelope-2"></a>
            <input
              placeholder="japple123@email.com"
              className="signup-input"
              value={this.state.email}
              onChange={this.handleEmailChange}
            ></input>
          </div>
          <div id="e86_16">
            <a className="icon-key" id="icon-key-2"></a>
            <input
              placeholder="********"
              type="password"
              className="signup-input"
              value={this.state.password}
              onChange={this.handlePasswordChange}
            ></input>
          </div>
          <span id="e86_17">Password</span>
          <span id="e86_18">Email</span>
          <div id="e103_18">
            <a className="icon-user" id="icon-user-2"></a>
            <input
              placeholder="Johnny Appleseed"
              className="signup-input"
              value={this.state.name}
              onChange={this.handleNameChange}
            ></input>
          </div>
          <span id="e103_19">Name</span>
          <div id="e86_22">
            <button id="signup_button" onClick={this.handleSignUp}></button>
          </div>
          <span id="e86_23">your pocket stylist</span>
          <div id="e86_25">
            <span id="ei86_25_43_16">// FIT CHECK</span>
          </div>
          <div id="e87_0">
            <a className="icon-key" id="icon-key-2"></a>
            <input
              placeholder="********"
              type="password"
              className="signup-input"
              value={this.state.passwordC}
              onChange={this.handleConfirmPasswordChange}
            ></input>
          </div>
          <div id="e87_2"></div>
          <span id="e91_22">SIGN UP</span>
          <span id="e91_24">Confirm Password</span>
          {this.state.password === this.state.passwordC ? (
            <div></div>
          ) : (
            <span id="e91_26">Passwords do not match!</span>
          )}
          <div id="e134_0"></div>
          <div id="e135_21"></div>
          <div id="e158_1"></div>
          <div id="e159_1"></div>
        </div>
      </div>
    );
  }
}

export default SignUp;
