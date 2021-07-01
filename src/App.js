import React, { Component } from "react";
import axios from "axios";
import "./App.css"

import ShowWeather from "./components/ShowWeather/ShowWeather";
import ShowAllLocation from "./components/ShowAllLocation/ShowAllLocation";
import Header from "./components/Header/Header"

export class App extends Component {
  state = {
    input: "",
    targetName: "",
    targetCountry: "",
    info: null,
    haveInfo: false,
    errorMessage: "",
    locationArray: [],
  };

  handleOnChange = (event) => {
    this.setState({
      input: event.target.value,
    });
  };

  async componentDidMount() {
    try {
      let allLocation = await axios.get(
        "http://localhost:8080/api/weather/get-all-location"
      );

      this.setState({
        locationArray: allLocation.data.payload,
      });
    } catch (e) {
      this.setState({
        errorMessage: e.response.data.message,
      });
    }
  }

  handleSearchSubmit = async () => {
    if (this.state.input.length === 0) {
      this.setState({
        errorMessage: "You must enter a location!",
      });
    } else {
      try {
        let result = await axios.get(
          // `https://api.openweathermap.org/data/2.5/weather?q=${this.state.input}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=imperial`
          `api.openweathermap.org/data/2.5/weather?q=London,uk&appid=4b9ff0b74663234a26ad6f08082a4618`
        );
        console.log(result)

        let foundIndex = this.state.locationArray.findIndex((item) => {
          if (item.city === result.data.name && result.data.sys.country) {
            return item;
          }
        });

        if (foundIndex === -1) {
          let savedLocation = await axios.post(
            "http://localhost:8080/api/weather/create-location",
            {
              city: result.data.name,
              country: result.data.sys.country,
            }
          );
          this.setState({
            targetName: result.data.name,
            targetCountry: result.data.sys.country,
            info: result.data.main,
            haveInfo: true,
            errorMessage: "",
            locationArray: [
              ...this.state.locationArray,
              savedLocation.data.payload,
            ],
          });
        }
      } catch (e) {
        this.setState({
          errorMessage: e.response.data.message,
        });
      }
    }
  };

  handleDeleteByID = async (id) => {
    try {
      let deleted = await axios.delete(
        `http://localhost:8080/api/weather/delete-by-id/${id}`
      );

      let filteredArray = this.state.locationArray.filter(
        (item) => item._id !== deleted.data.payload._id
      );

      this.setState({
        locationArray: filteredArray,
      });
    } catch (e) {
      this.setState({
        errorMessage: e.response.data.message,
      });
    }
  };

  getLocationWeather = async (location) => {
    try {
      let result = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.REACT_APP_WEATHER_KEY}&units=imperial`
      );

      this.setState({
        targetName: result.data.name,
        targetCountry: result.data.sys.country,
        info: result.data.main,
        haveInfo: true,
        errorMessage: "",
      });
    } catch (e) {
      this.setState({
        errorMessage: e.response.data.message,
      });
    }
  };

  render() {
    //console.log(this.state);
    return (
      <div className='page' style={{ textAlign: "center", marginTop: "8%" }}>
        <Header />

        <div className='middle'>
          <div className='left'>
            <div className='searchO'>

              <input
                onChange={this.handleOnChange}
                type="text"
                value={this.state.input}
                name="input"
                id="inputbox"
              />
              <button onClick={this.handleSearchSubmit} id='button'>Submit</button>
              <div>{this.state.errorMessage && this.state.errorMessage}</div>
            </div>
            <div className='results'>
              <ShowWeather
                targetName={this.state.targetName}
                targetCountry={this.state.targetCountry}
                info={this.state.info}
                haveInfo={this.state.haveInfo}
              />
            </div>
          </div>

          <div className='right'>
            <h1 className='h1'>Recently Searched Locations</h1>
            <div>
              <ShowAllLocation
                locationArray={this.state.locationArray}
                handleDeleteByID={this.handleDeleteByID}
                getLocationWeather={this.getLocationWeather}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default App;