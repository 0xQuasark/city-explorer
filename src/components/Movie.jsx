import React from "react";
import Table from 'react-bootstrap/Table';

class Movie extends React.Component {


  generateMovieTable = () => {
    // console.log('weather called');
    let movieData = this.props.movieData;
    
    return Object.keys(movieData).map(key => (
      <tr key={key}>
        <td><img src={movieData[key].image_url} /></td>
        <td>
          <strong>Title: </strong>      {movieData[key].title}  <br /> 
          <strong>Overview: </strong>   {movieData[key].overview}  <br /> 
          <strong>Overage Votes: </strong>   {movieData[key].averageVotes}  <br /> 
          <strong>Total Votes: </strong>   {movieData[key].totalVotes}  <br /> 
          <strong>Popularity: </strong>   {movieData[key].popularity}  <br /> 
          <strong>Released: </strong>   {movieData[key].released_on}  <br /> 
        </td>
      </tr>
    ));

  }

  render () {

    let movieTable = this.generateMovieTable();

    return (
      <>
        <h2> Movie data:</h2>
        <Table striped bordered hover size="sm" variant="dark">
          <thead>
            <tr>
              <th>Image</th>
              <th>details</th>
            </tr>
          </thead>
          <tbody>
            {movieTable}
          </tbody>
        </Table>
      </>
    )
  }
}

export default Movie