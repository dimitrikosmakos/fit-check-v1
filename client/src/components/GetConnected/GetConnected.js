import React, { Component } from "react";
import axios from "axios";
import "../GetConnected/GetConnected.css";
import { Zoom } from "react-slideshow-image";
import friend1 from "./images/1.jpg";
import friend2 from "./images/2.jpg";
import friend3 from "./images/3.jpg";
import user1 from "./images/user1.jpg";
import user2 from "./images/user2.jpg";
import user3 from "./images/user3.jpg";

/**
 * Get Connected component where users can see their outfits,
 * and users can also add friends and see their outfits.
 *
 * @version 1.0.1
 * @author [Abhinav Joshi] (https://github.com/abhijoshi2000)
 * @author [Emily Costello] (https://github.com/ecostello9)
 */
class GetConnected extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: this.props.location.state.jwt,
      friendEmail: "",
      yourFits: [],
      friendFits: [],
    };
    this.handleFriendEmailChange = this.handleFriendEmailChange.bind(this);
    this.handleAddFriend = this.handleAddFriend.bind(this);
    this.renderFriendFits = this.renderFriendFits.bind(this);
    this.renderYourFits = this.renderYourFits.bind(this);
  }

  async componentDidMount() {
    await this.renderFriendFits();
    await this.renderYourFits();
  }

  async renderFriendFits() {
    const res = await axios.get(
      "http://localhost:5000/social/display_friends",
      {
        headers: {
          Authorization: this.state.jwt,
        },
      }
    );
    var imgsArray = [];
    for (var i = 0; i < res.data.length; i++) {
      const filePath = res.data[i].img.filePath.split("/");
      const fileName = filePath[filePath.length - 1];
      imgsArray.push(fileName);
    }
    const oldJwt = this.state.jwt;
    const oldYourFits = this.state.yourFits;
    this.setState({
      jwt: oldJwt,
      friendEmail: "",
      yourFits: oldYourFits,
      friendFits: imgsArray,
    });
  }

  async renderYourFits() {
    const res = await axios.get("http://localhost:5000/outfits", {
      headers: {
        Authorization: this.state.jwt,
      },
    });
    var imgsArray = [];
    for (var i = 0; i < res.data.length; i++) {
      var len = res.data[i].img.filePath.length;
      const filePath = res.data[i].img.filePath.split("/");
      const fileName = filePath[filePath.length - 1];
      imgsArray.push(fileName);
    }
    const oldJwt = this.state.jwt;
    const oldFriendFits = this.state.friendFits;
    this.setState({
      jwt: oldJwt,
      friendEmail: "",
      yourFits: imgsArray,
      friendFits: oldFriendFits,
    });
  }

  async handleFriendEmailChange(e) {
    const oldJwt = this.state.jwt;
    const oldFriendFits = this.state.friendFits;
    const oldYourFits = this.state.yourFits;
    await this.setState({
      jwt: oldJwt,
      friendEmail: e.target.value,
      friendFits: oldFriendFits,
      yourFits: oldYourFits,
    });
  }

  async handleAddFriend(e) {
    if (e.key !== "Enter") {
      return;
    } else {
      const res = await axios.put(
        "http://localhost:5000/social/follow",
        {
          friendEmail: this.state.friendEmail,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: this.state.jwt,
          },
        }
      );
      document.getElementById("friend_added").innerHTML =
        "now following " + this.state.friendEmail;
      setTimeout(function () {
        document.getElementById("friend_added").innerHTML = "";
      }, 3000);
    }
  }

  render() {
    const friend_imgs = [friend1, friend2, friend3];
    const user_imgs = [user1, user2, user3];
    const zoomOutProperties = {
      duration: 2500,
      transitionDuration: 500,
      infinite: true,
      indicators: true,
      scale: 0.4,
      arrows: true,
    };
    const images = require.context("../../files/", true);
    const loadImage = (imageName) => images(`./${imageName}`).default;
    return (
      <div id="e204_7">
        <span id="e205_8">// GET CONNECTED</span>
        <span id="e205_22">// ADD FRIENDS</span>
        <span id="e205_60">// COMMUNITY</span>
        <div id="e205_12">
          {this.state.friendFits.length === 0 ? (
            <Zoom {...zoomOutProperties}>
              {friend_imgs.map((each, index) => (
                <img key={index} id="ss-img" src={each} />
              ))}
            </Zoom>
          ) : (
            <Zoom {...zoomOutProperties}>
              {this.state.friendFits.map((each, index) => {
                const img = loadImage(each);
                return <img key={index} id="ss-img" src={img} />;
              })}
            </Zoom>
          )}
        </div>
        <div id="e205_18"></div>
        <span id="e205_61">// YOUR FITS</span>
        <div id="e205_62">
          {this.state.yourFits.length === 0 ? (
            <Zoom {...zoomOutProperties}>
              {friend_imgs.map((each, index) => (
                <img key={index} id="ss-img" src={each} />
              ))}
            </Zoom>
          ) : (
            <Zoom {...zoomOutProperties}>
              {this.state.yourFits.map((each, index) => {
                const img = loadImage(each);
                return <img key={index} id="ss-img" src={img} />;
              })}
            </Zoom>
          )}
        </div>
        <div id="e205_50">
          <input
            id="tags_input_gc"
            value={this.state.friendEmail}
            onChange={this.handleFriendEmailChange}
            onKeyDown={this.handleAddFriend}
          ></input>
        </div>
        <div id="friend_added"></div>
        <div id="e205_64"></div>
        <div id="e136_2000">
          <div id="e136_2001"></div>
          <div id="e136_2002"></div>
          <span id="e136_2003">// FIT CHECK</span>
        </div>
        <div id="e134_0"></div>
        <div id="e135_21"></div>
        <div id="e158_1"></div>
        <div id="e159_1"></div>
      </div>
    );
  }
}

export default GetConnected;
