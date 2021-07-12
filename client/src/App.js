import React from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Home from "./components/Home/Home";

/**
 * Main top level component that handles the first end-user request to Login. On login success, routes to Home Screen.
 * State consists of JWT auth token which is sent upon login and passed to requisite components.
 *
 * @version 1.0.1
 * @author [Abhinav Joshi] (https://github.com/abhijoshi2000)
 * @author [Emily Costello] (https://github.com/ecostello9)
 */

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: "",
      image: null,
    };
    this.update = this.update.bind(this);
  }

  // Handles updating JWT auth token based on backend response --> Updates state accordingly
  async update(value) {
    await this.setState({
      jwt: value,
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="App">
        {this.state.jwt.length <= 0 ? (
          <Login data={this.update.bind(this)} />
        ) : (
          <Home jwt={this.state.jwt} />
        )}
      </div>
    );
  }
}

export default App;
