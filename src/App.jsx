import React from 'react'
import './App.css'
import axios from 'axios';
import CityDetails from './components/CityDetails';
import Error from './components/Error';
import Weather from './components/Weather';
import Movie from './components/Movie';
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';


// Vites way of loading files from a .env file -> requires "VITE_" to be used at the beginning of your key
const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;
// const SERVER = import.meta.env.VITE_MY_API_SERVER;
const SERVER = 'http://localhost:3001';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: 'Seattle',
      locationData: null,
      mapURL: null,
      errorState: null,
      forecastData: null,
      movieData: null,
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

        return axios.get(`${SERVER}/weather?city=${this.state.searchQuery}&lat=${newLocationData.lat}&lon=${newLocationData.lon}`);
      })
      .then(response =>{
        // console.log('something happened!', response.data)
        this.setState({forecastData: response.data});
        return axios.get(`${SERVER}/movies/?cityName=${this.state.searchQuery}`);
      })
      .then(response => {
        this.setState({movieData : response.data});
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
        <h1>City Explorer v3</h1>
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

        <h2> Weather data:</h2>
          <Table striped bordered hover size="sm" variant="dark">
            <thead>
              <tr>
                <th>Date</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {/*add Movie call here, map and pass individual data*/}
              {this.state.forecastData && this.state.forecastData.map(weather => (
                <Weather key={weather.date} weatherData={weather} />
              ))}
            </tbody>
          </Table>

        {/* {this.state.forecastData ? <Weather weatherData={this.state.forecastData} /> : ''} */}

        {/* {this.state.movieData && <Movie movieData={this.state.movieData} />} */}
        {/* {this.state.movieData && this.state.movieData.map(movie => (
                <Movie key={movie.id} movieData={movie} />
        ))} */}

        {this.state.errorState ? <Error error={this.state.errorState} /> : ''}

      </>
      )
    }
}

export default App
