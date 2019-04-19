
import React, { Component } from 'react';

export default class Breed extends Component {
  render() {
    let breed = this.props.breed;
    return (
      <div className="breed column is-10-mobile is-10-tablet is-5-desktop">
        <h1 className="title">{breed.name}</h1>
        <div className="breed-content columns is-multiline">
          <div className="column is-12">{breed.description}</div>
          <div className="column is-6 has-text-centered">{breed.temperament}</div>
          <div className="column is-6 has-text-centered">Origin: {breed.origin}</div>
        </div>
      </div>
    )
  }
}
