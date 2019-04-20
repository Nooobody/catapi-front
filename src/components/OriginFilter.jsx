
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions as breedActions } from '../redux/components/breed';

class OriginFilter extends Component {
  mapOrigins() {
    return this.props.breeds
      .map(breed => breed.origin)                           // Map to the origins
      .filter((org, ind, arr) => arr.indexOf(org) === ind)  // Return only uniques
      .sort()
  }

  renderOption(origin, index) {
    return <option value={origin} key={index}>{origin}</option>
  }

  renderSelect() {
    return (
      <div className="select is-fullwidth">
        <select
          name="origin"
          value={this.props.filter}
          onChange={(e) => this.props.setFilter({filter: e.target.value})}
          >
          {
            this.props.filter ?
              <option value="">Clear Filter</option> :
              <option value="" hidden>Filter by Origin</option>
          }
          {this.mapOrigins().map(this.renderOption)}
        </select>
      </div>
    )
  }

  render() {
    return (
      <div className="control">
        {this.renderSelect()}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filter: state.breed.filter,
  breeds: state.breed.breeds
})

const mapDispatchToProps = {
  setFilter: breedActions.filterBreedsByOrigin
}

export default connect(mapStateToProps, mapDispatchToProps)(OriginFilter);
