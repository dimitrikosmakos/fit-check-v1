import React, { Component } from "react";
import "./Login.css";
import axios from "axios";
import SignUp from "../SignUp/SignUp";

/**
 * Login component that handles user inputted email and password and validates user credentials.
 * Returns a JWT auth token up throughout the component hierarchy in order to make future requests.
 *
 * @version 1.0.1
 * @author [Abhinav Joshi] (https://github.com/abhijoshi2000)
 * @author [Emily Costello] (https://github.com/ecostello9)
 */
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      jwt: "",
      signup: false,
      incorrectLogin: false,
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.handler = this.handler.bind(this);
  }

  // Axios is used to handle requests to backend endpoints --> Here we use a POST request
  // with the user's inputted email and password
  handleLogin() {
    axios
      .post("http://localhost:5000/auth/signin", {
        email: this.state.username,
        password: this.state.password,
      })
      .then((res) => {
        if (res.status === 200) {
          this.props.data(res.data.token);
        }
      })
      .catch((err) => {
        document.getElementById("incorrect-pass").innerHTML =
          "INCORRECT USERNAME/PASSWORD";
        setTimeout(function () {
          document.getElementById("incorrect-pass").innerHTML = "";
        }, 3000);
      });
  }

  handler() {
    this.setState({
      signup: false,
    });
  }

  async handleSignUp() {
    await this.setState({
      signup: true,
    });
  }

  // Updates dynamically when user inputs email
  async handleUsernameChange(e) {
    const oldPassword = this.state.password;
    await this.setState({
      username: e.target.value,
      password: oldPassword,
    });
  }

  // Updates dynamically when user inputs password
  async handlePasswordChange(e) {
    const oldUsername = this.state.username;
    await this.setState({
      username: oldUsername,
      password: e.target.value,
    });
  }

  render() {
    return (
      <div className="screen">
        {this.state.signup ? (
          <SignUp handler={this.handler} />
        ) : (
          <div>
            <div>
              <div id="e43_2">
                <div id="e43_5"></div>
                <div id="e43_6">
                  <input
                    type="password"
                    id="e43_11_input"
                    placeholder="***************"
                    value={this.state.password}
                    onChange={this.handlePasswordChange}
                  ></input>
                </div>
                <span id="e43_7">Password</span>
                <div id="incorrect-pass"></div>
                <span id="e43_8">Username/Email</span>
                <div id="e43_10">
                  <input
                    id="e43_9_input"
                    placeholder="example@example.com"
                    value={this.state.username}
                    onChange={this.handleUsernameChange}
                  ></input>
                </div>
                <div id="e43_11">
                  <a className="icon-envelope"> </a>
                </div>
                <div id="e43_13"></div>
                <span id="e43_14">your pocket stylist</span>
                <span id="e43_15">LOGIN</span>
                <button id="e43_15_button" onClick={this.handleLogin}></button>
                <div id="e43_21">
                  <span id="e43_16">// FIT CHECK</span>
                </div>
                <span id="e43_17">Don’t have an account? Sign up here!</span>
                <button id="e43_17_button" onClick={this.handleSignUp}></button>
                <div id="e43_18">
                  <a className="icon-key"> </a>
                </div>
              </div>
            </div>
            <div className="home-slideshow">
              <div className="home-images"></div>
            </div>
            <div id="e134_0"></div>
            <div id="e135_21"></div>
            <div id="e158_1"></div>
            <div id="e159_1_2"></div>
          </div>
        )}
      </div>
    );
  }
}

export default Login;
