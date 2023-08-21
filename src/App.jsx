import React from 'react'
import './App.css'
import axios from 'axios';
import CityDetails from './components/CityDetails';

// Vites way of loading files from a .env file -> requires "VITE_" to be used at the beginning of your key
const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: 'Seattle',
      locationData: null,
    }
  }

  handleForm = (e) => {
    e.preventDefault();
    // console.log('City name provided', this.state.searchQuery);
    // console.log('API Key: ', API_KEY)
    const urlQuery = `https://us1.locationiq.com/v1/search.php?key=${API_KEY}&q=${this.state.searchQuery}&format=json`;
    axios.get(urlQuery)
      .then(response => {
        const newLocationData = response.data[0];
        this.setState({locationData: newLocationData})
        console.log('Success: ', newLocationData)
        this.prepareRender();
      })
      .catch(error => {
        console.log('Error: ', error)
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
        />
      </>
      )
    }
}

export default App
