
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions as breedActions } from '../redux/components/breed';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class OriginFilter extends Component {
  mapOrigins() {
    return this.props.breeds
      .map(breed => breed.origin)                           // Map to the origins
      .filter((org, ind, arr) => arr.indexOf(org) === ind)  // Return only uniques
      .sort()
  }

  addFilter(filter) {
    if (filter === "") {
      this.props.clearFilters();
    }
    else {
      this.props.addFilter({filter});
    }
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
          onChange={(e) => this.addFilter(e.target.value)}
          >
          {
            this.props.filters.length > 0 ?
              <option value="">Clear Filters</option> :
              <option value="" hidden>Filter by Origin</option>
          }
          {this.mapOrigins().map(this.renderOption)}
        </select>
      </div>
    )
  }

  render() {
    return (
      <div className="control has-icons-left">
        {this.renderSelect()}
        <div className="icon is-left">
          <FontAwesomeIcon icon="globe"></FontAwesomeIcon>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.breed.filters,
  breeds: state.breed.breeds
})

const mapDispatchToProps = {
  addFilter: breedActions.addFilter,
  clearFilters: breedActions.clearFilters
}

export default connect(mapStateToProps, mapDispatchToProps)(OriginFilter);
