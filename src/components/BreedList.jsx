
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions as breedActions } from '../redux/components/breed';

import Breed from './Breed';

class BreedList extends Component {

  filterBreeds(breeds) {
    if (this.props.filters.length) {
      let b = [];

      for (let filter of this.props.filters) {
        b = b.concat(breeds.filter(breed => breed.origin.indexOf(filter) > -1));
      }

      return b;
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
            <div className="title">No breeds found!</div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  breeds: state.breed.breeds,
  searchResults: state.search.searchResults,
  search: state.search.search,
  filters: state.breed.filters
})

const mapDispatchToProps = {
  fetchBreeds: breedActions.fetchAllBreeds
}

export default connect(mapStateToProps, mapDispatchToProps)(BreedList)
