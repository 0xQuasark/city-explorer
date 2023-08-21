import React from "react";
import axios from "axios";

class CityDetails extends React.Component {
  constructor() {
    super();
  }

  getMapData = () => {
    console.log(this.props.mapURL);
    axios.get(this.props.mapURL)
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log('ERROR! ', error)
      });

  }

  render () {
    // this.getMapData();
    return (
      <>
        <p>City Searched for: {this.props.city}</p>
        <p>Latitude: {this.props.lat}</p>
        <p>Longitude: {this.props.lon}</p>
        <p>Map:</p>
          <img src={this.props.mapURL}></img>

      </>
    )
  }
}

export default CityDetails