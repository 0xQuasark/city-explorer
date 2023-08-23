import React from 'react'
import './App.css'
import axios from 'axios';
import CityDetails from './components/CityDetails';
import Error from './components/Error';
import Weather from './components/Weather';
import 'bootstrap/dist/css/bootstrap.min.css';


// Vites way of loading files from a .env file -> requires "VITE_" to be used at the beginning of your key
const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: 'Seattle',
      locationData: null,
      mapURL: null,
      errorState: null,
      forecastData: null,
    }
  }

  handleForm = (e) => {
    e.preventDefault();
    const urlQuery = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.searchQuery}&format=json`;
    axios.get(urlQuery)
      .then(response => {
        const newLocationData = response.data[0];
        this.setState({locationData: newLocationData})

        const mapQueryURL = `https://maps.locationiq.com/v3/staticmap?key=${API_KEY}&center=${newLocationData.lat},${newLocationData.lon}&zoom=9`;
        this.setState({mapURL: mapQueryURL});

        return axios.get(`http://localhost:3001/weather?city=${this.state.searchQuery}&lat={newLocationData.lat}}`);
      })
      .then(response =>{
        console.log('something happened!', response.data)
        this.setState({forecastData: response.data})
      })
      .catch(error => {
        console.log('Error: ', error)
        this.setState({errorState: error.message})
      });
  }

  handleChange= (e) => {
    const newQuery = e.target.value;
    this.setState({searchQuery: newQuery})
    // console.log(e.target.value);
  }

  render () {
    return (
      <>
        <h1>Day6, v2</h1>
        <form onSubmit={this.handleForm}>
          <input placeholder="Enter City Name" name="city" value={this.state.searchQuery? this.state.searchQuery : 'Enter City Name'} type="text" onChange={this.handleChange} />
          <button type='submit' >
              Explore!
              {/* <Link to="/search">Search!</Link> */}
            </button>
        </form>

        <CityDetails 
          city={this.state.searchQuery}
          lat={this.state.locationData ? this.state.locationData.lat : ''}
          lon={this.state.locationData ? this.state.locationData.lon : ''}
          mapURL={this.state.mapURL ? this.state.mapURL : null}
        />

        {this.state.errorState ? <Error error={this.state.errorState}/> : ''}
        {this.state.forecastData ? <Weather weatherData={this.state.forecastData}/> : ''}

      </>
      )
    }
}

export default App
