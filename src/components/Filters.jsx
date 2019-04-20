
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { actions as breedActions } from '../redux/components/breed';

class Filters extends Component {
  removeFilter = (filter) => {
    this.props.removeFilter({filter})
  }

  renderFilter(filter, index) {
    return (
      <div className="control" key={index}>
        <div className="tags has-addons" key={index}>
          <span className="tag is-primary">{filter}</span>
          <div className="tag is-delete" onClick={() => this.removeFilter(filter)} />
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="filter-wrapper field is-grouped is-grouped-multiline">
        {this.props.filters.map(this.renderFilter, this)}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  filters: state.breed.filters
});

const mapDispatchToProps = {
  removeFilter: breedActions.removeFilter
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)
