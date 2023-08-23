import React from "react";

class CityDetails extends React.Component {

  render () {
    return (
      <>
        <p>City Searched for: {this.props.city}</p>
        <p>Latitude: {this.props.lat}</p>
        <p>Longitude: {this.props.lon}</p>
        {this.props.mapURL ? <h2>Map:</h2> : ''}
          <img src={this.props.mapURL}></img>

      </>
    )
  }
}

export default CityDetails