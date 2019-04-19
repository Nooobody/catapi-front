
import React, { Component } from 'react';

import API from '../api';
import { API_URL } from '../config';

import Breed from './Breed';

export default class BreedList extends Component {

  state = {
    breeds: []
  }

  async componentDidMount() {
    this.API = new API(API_URL);
    const breeds = await this.API.getAllBreeds();
    this.setState({
      breeds
    });
  }

  render() {
    let breeds = this.state.breeds;
    return (
      <div className="columns is-multiline is-centered is-mobile">
        {
          breeds.map((breed, index) => <Breed key={index} breed={breed} />)
        }
      </div>
    )
  }
}
