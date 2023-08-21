import React from "react";

class CityDetails extends React.Component {

  render () {
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