
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions as breedActions } from '../redux/components/breed';

import Breed from './Breed';

class BreedList extends Component {

  componentDidMount() {
    this.props.fetchBreeds();
  }

  filterBreeds(breeds) {
    if (this.props.filter) {
      return breeds.slice().filter(breed => breed.origin.indexOf(this.props.filter) > -1);
    }
    else {
      return breeds;
    }
  }

  renderBreed(breed, index) {
    return (
      <Breed key={index} breed={breed} />
    )
  }

  render() {
    let breeds = this.props.breeds;
    if (this.props.search) {
      breeds = this.props.searchResults;
    }

    breeds = this.filterBreeds(breeds);
    return (
      <div className="columns is-multiline is-centered is-mobile">
        {
          breeds.length ? 
            breeds.map(this.renderBreed) :
            <div>No breeds found!</div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  breeds: state.breed.breeds,
  searchResults: state.breed.searchResults,
  search: state.breed.search,
  filter: state.breed.filter
})

const mapDispatchToProps = {
  fetchBreeds: breedActions.fetchAllBreeds
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedList)
