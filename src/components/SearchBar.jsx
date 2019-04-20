
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { debounce } from 'debounce';
import { actions as breedActions } from '../redux/components/breed';

class SearchBar extends Component {

  state = {
    input: ""
  }

  _doSearch() {
    let search = this.state.input;
    if (!search) {
      return;
    }

    this.props.searchByName({search})
  }

  doSearch = debounce(this._doSearch, 400);

  setInput(val) {
    this.setState({
      input: val
    });

    if (val === "") {
      this.props.clearSearch();
    }
    else {
      this.doSearch();
    }
  }

  render() {
    return (
      <div className="control has-icons-right">
        <input
          type="text"
          className="input"
          value={this.state.input}
          onInput={(e) => this.setInput(e.target.value)}
          onChange={() => {}}
          placeholder="Search by Name"
          />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  search: state.breed.search
});

const mapDispatchToProps = {
  searchByName: breedActions.searchBreedsByName,
  clearSearch: breedActions.clearSearch
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
