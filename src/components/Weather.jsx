import React from "react";
import Table from 'react-bootstrap/Table';

class Weather extends React.Component {


  generateTable = () => {
    console.log('weather called');
    let weatherData = this.props.weatherData;
    
    return Object.keys(weatherData).map(key => (
      <tr key={key}>
        <td>{weatherData[key].date}</td>
        <td>{weatherData[key].description}</td>
      </tr>
    ));

  }

  render () {

    let weatherTable = this.generateTable();
    console.log(weatherTable);

    return (
      <>
        <h2> Weather data:</h2>
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {weatherTable}
          </tbody>
        </Table>
      </>
    )
  }
}

export default Weather