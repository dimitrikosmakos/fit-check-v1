import React, { Component } from "react";
import axios from "axios";
import "../GetAdvice/GetAdvice.css";

/**
 * Get Advice component where users can upload images for fashion advice
 * Users can also tag images and provide descriptions
 *
 * @version 1.0.1
 * @author [Abhinav Joshi] (https://github.com/abhijoshi2000)
 * @author [Emily Costello] (https://github.com/ecostello9)
 */
class GetAdvice extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jwt: this.props.location.state.jwt,
      tags: "",
      description: "",
      file: null,
      filePreview: null,
      rating: -1,
      recommendation: null,
      preference: "fem"
    };
    this.handleImageUpload = this.handleImageUpload.bind(this);
    this.handleTagChange = this.handleTagChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.handlePreferenceChange = this.handlePreferenceChange.bind(this)
  }

  // Updates dynamically when user inputs tags
  async handleTagChange(e) {
    const oldJwt = this.state.jwt;
    const oldDescription = this.state.description;
    const oldFile = this.state.file;
    const oldFilePreview = this.state.filePreview;
    const oldPreference = this.state.preference
    await this.setState({
      jwt: oldJwt,
      description: oldDescription,
      tags: e.target.value,
      file: oldFile,
      filePreview: oldFilePreview,
      rating: -1,
      recommendation: null,
      preference: oldPreference
    });
  }

  // Updates dynamically when user inputs description
  async handleDescriptionChange(e) {
    const oldJwt = this.state.jwt;
    const oldTags = this.state.tags;
    const oldFile = this.state.file;
    const oldFilePreview = this.state.filePreview;
    const oldDescription = this.state.description
    const oldPreference = this.state.preference
    await this.setState({
      jwt: oldJwt,
      description: e.target.value,
      tags: oldTags,
      file: oldFile,
      filePreview: oldFilePreview,
      rating: -1,
      recommendation: null,
      preference: oldPreference
    });
  }

  // Updates dynamically when user selects preference
  async handlePreferenceChange(e) {
    const oldJwt = this.state.jwt;
    const oldTags = this.state.tags;
    const oldFile = this.state.file;
    const oldFilePreview = this.state.filePreview;
    const oldDescription = this.state.description
    await this.setState({
      jwt: oldJwt,
      description: oldDescription,
      tags: oldTags,
      file: oldFile,
      filePreview: oldFilePreview,
      rating: -1,
      recommendation: null,
      preference: e.target.value
    });
  }

  async onFileChange(event) {
    // Update the state
    const oldJwt = this.state.jwt;
    const oldTags = this.state.tags;
    const oldDescription = this.state.description;
    const oldPreference = this.state.preference
    console.log(event.target.files[0]);
    await this.setState({
      jwt: oldJwt,
      tags: oldTags,
      description: oldDescription,
      file: event.target.files[0],
      filePreview: window.URL.createObjectURL(
        new Blob([event.target.files[0]], {
          type: "image/png",
        })
      ),
      rating: -1,
      recommendation: null,
      preference: oldPreference
    });
    document.getElementById("e63_34").style.opacity = 0;
  }

  async handleImageUpload(event) {
    event.preventDefault();
    // Create an object of formData
    var formData = new FormData();
    // Update the formData object
    formData.append("file", this.state.file);
    formData.append("tags", this.state.tags);
    formData.append("description", this.state.description);
    formData.append("preference", this.state.preference)
    // Request made to the backend api
    // Send formData object
    const res = await axios.post("http://localhost:5000/outfits", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: this.state.jwt,
      },
    });
    var recommendUrl =
      "http://localhost:5000/outfits/recommendation/" + res.data._id;
    const recommendedOutfits = await axios.get(recommendUrl, {
      headers: {
        Authorization: this.state.jwt,
      },
    });
    const oldJwt = this.state.jwt;
    const oldTags = this.state.tags;
    const oldDescription = this.state.description;
    const oldFile = this.state.file;
    const oldFilePreview = this.state.filePreview;
    const oldPreference = this.state.preference
    await this.setState({
      jwt: oldJwt,
      tags: oldTags,
      description: oldDescription,
      file: oldFile,
      filePreview: oldFilePreview,
      rating: res.data.rating,
      recommendation: recommendedOutfits.data,
      preference: oldPreference
    });
  }

  render() {
    return (
      <div>
        {this.state.rating != -1 ? (
          <div>
            <div id="e63_81">
              <span id="e63_82">// RATING</span>
              <span id="e130_22">{this.state.rating}</span>
              <div id="e63_86">
                <img id="img_preview" src={this.state.filePreview} />
              </div>
              {this.state.rating >= 0 ? (
                <div id="e130_40_black"></div>
              ) : (
                <div id="e130_40"></div>
              )}
              {this.state.rating >= 20 ? (
                <div id="e130_42_black"></div>
              ) : (
                <div id="e130_42"></div>
              )}
              {this.state.rating >= 40 ? (
                <div id="e130_43_black"></div>
              ) : (
                <div id="e130_43"></div>
              )}
              {this.state.rating >= 60 ? (
                <div id="e130_39_black"></div>
              ) : (
                <div id="e130_39"></div>
              )}
              {this.state.rating >= 80 ? (
                <div id="e130_41_black"></div>
              ) : (
                <div id="e130_41"></div>
              )}
              <span id="e205_65">// SUGGESTED FITS</span>
              <div id="e205_44">
                <a href={this.state.recommendation[0].product}>
                  <img
                    hidden={!this.state.rating == -1}
                    id="rec_img"
                    alt="img8"
                    src={this.state.recommendation[0].model_image}
                  ></img>
                </a>
              </div>
              <div id="e205_45">
                <a href={this.state.recommendation[1].product}>
                  <img
                    hidden={!this.state.rating == -1}
                    id="rec_img"
                    alt="img8"
                    src={this.state.recommendation[1].model_image}
                  ></img>
                </a>
              </div>
              <div id="e215_0">
                <a href={this.state.recommendation[2].product}>
                  <img
                    hidden={!this.state.rating == -1}
                    id="rec_img"
                    alt="img8"
                    src={this.state.recommendation[2].model_image}
                  ></img>
                </a>
              </div>
              <div id="e135_139"></div>
              <div id="e135_140"></div>
              <div id="e136_2014">
                <div id="e136_2015"></div>
                <div id="e136_2016"></div>
                <span id="e136_2017">// FIT CHECK</span>
              </div>
              <div id="e134_0"></div>
              <div id="e135_21"></div>
              <div id="e158_1"></div>
              <div id="e159_1"></div>
            </div>
          </div>
        ) : (
          <div id="e63_2">
            <span id="e64_9">// GET ADVICE</span>
            <span id="e63_63">// TAGS</span>
            <span id="e63_64">// DESCRIPTION</span>
            <span  class="e247_9">// PREFERENCE</span>
            <div class="e247_10">
              <select id="pref" onChange={this.handlePreferenceChange}>
                <option value="fem">Feminine</option>
                <option value="masc">Masculine</option>
              </select>
            </div>
            <div id="e64_123">
              <img id="img_preview" src={this.state.filePreview} />
            </div>
            <div id="e63_34">
              <label className="style-file-upload">
                <input
                  id="e63_36"
                  type="file"
                  onChange={this.onFileChange}
                ></input>
              </label>
            </div>
            <div id="e64_24">
              <input
                id="tags_input"
                value={this.state.tags}
                onChange={this.handleTagChange}
              ></input>
            </div>
            <div id="e64_31">
              <textarea
                id="description_input"
                value={this.state.description}
                onChange={this.handleDescriptionChange}
              ></textarea>
            </div>
            <div id="e136_2005">
              <div id="e136_2006"></div>
              <div id="e136_2007"></div>
              <span id="e136_2008">// FIT CHECK</span>
            </div>
            <div id="e136_2023">
              <button
                id="submit_button"
                onClick={this.handleImageUpload}
              ></button>
            </div>
            <span id="e136_2024">SUBMIT</span>
            <div id="e134_0"></div>
            <div id="e135_21"></div>
            <div id="e158_1"></div>
            <div id="e159_1"></div>
          </div>
        )}
      </div>
    );
  }
}

export default GetAdvice;
