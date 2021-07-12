import React, { Component } from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import GetAdvice from "../GetAdvice/GetAdvice";
import GetConnected from "../GetConnected/GetConnected";
import GetInspired from "../GetInspired/GetInspired";
import "./Home.css";

/**
 * Home page component that acts as a main page from which users can navigate with the app.
 * Currently supporrts "Get Inspired" and "Get Advice" subfields
 *
 * @version 1.0.1
 * @author [Abhinav Joshi] (https://github.com/abhijoshi2000)
 * @author [Emily Costello] (https://github.com/ecostello9)
 */
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: this.props.jwt,
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  // TODO: Handle the search bar to render data based on search
  handleSearch() {
    console.log(this.state.jwt);
  }

  render() {
    return (
      <BrowserRouter>
        <div id="e33_3">
          <div id="e136_1980"></div>
          <div id="e136_1983"></div>
          <div id="e136_1982"></div>
          <Link
            to={{
              pathname: "/getinspired",
              state: {
                jwt: this.state.jwt,
              },
            }}
          >
            <span id="e47_21">// GET INSPIRED</span>
          </Link>
          <Link
            to={{
              pathname: "/getconnected",
              state: {
                jwt: this.state.jwt,
              },
            }}
          >
            <span id="e136_1975">// GET CONNECTED</span>
          </Link>
          <Link
            to={{
              pathname: "/getadvice",
              state: {
                jwt: this.state.jwt,
              },
            }}
          >
            <span id="e47_22">// GET ADVICE</span>
          </Link>
          <div id="e78_0"></div>
          <div id="e82_14"></div>
          <div className="slideshow">
            <div className="images"></div>
          </div>
          <div id="e145_7"></div>
          <div id="e145_8"></div>
          <div id="e136_2000">
            <div id="e136_2001"></div>
            <div id="e136_2002"></div>
            <span id="e136_2003">// FIT CHECK</span>
          </div>
          <div id="e158_1"></div>
        </div>
        <Switch>
          <Route path="/getinspired" component={GetInspired} />
          <Route path="/getadvice" component={GetAdvice} />
          <Route path="/getconnected" component={GetConnected} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Home;
