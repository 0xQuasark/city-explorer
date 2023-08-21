import React from 'react'
import './App.css'
import axios from 'axios';

// Vites way of loading files from a .env file -> requires "VITE_" to be used at the beginning of your key
const API_KEY = import.meta.env.VITE_LOCATIONIQ_API_KEY;


class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchQuery: '',
    }
  }

  handleForm = (e) => {
    e.preventDefault();
    console.log('City name provided', this.state.searchQuery);
    console.log('API Key: ', API_KEY)

  }


  handleSubmit= (e) => {
    const newQuery = e.target.value;
    this.setState({searchQuery: newQuery})
  }

  render () {
    return (
      <>
        <h1>Day6, v2</h1>
        <form onClick={this.handleForm}>
          <input placeholder="Enter City Name" name="city" type="text" onChange={this.handleSubmit} />
            <button type='submit' >
              Explore!
              {/* <Link to="/search">Search!</Link> */}
            </button>
        </form>
      </>
      )
    }
}

export default App
