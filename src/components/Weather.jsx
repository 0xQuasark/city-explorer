import React from "react";

class Weather extends React.Component {

  render () {
    const weatherData = this.props.weatherData;

    return (
      <>
        <tr>
          <td>{weatherData.date}</td>
          <td>{weatherData.description}</td>
        </tr>
      </>
    )
  }
}

export default Weather