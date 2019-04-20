
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { debounce } from 'debounce';
import { actions as searchActions } from '../redux/components/search';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
      this.props.startSearching();
      this.doSearch();
    }
  }

  clearSearch = () => {
    this.setState({
      input: ""
    });
    this.props.clearSearch();
  }

  render() {
    return (
    <div className="field has-addons">
      <div className="control has-icons-left is-expanded">
        <input
          type="text"
          className="input"
          value={this.state.input}
          onInput={(e) => this.setInput(e.target.value)}
          onChange={() => {}}
          placeholder="Search by Name"
          />
        <div className="icon is-left">
          <FontAwesomeIcon icon="search"></FontAwesomeIcon>
        </div>
      </div>
      {
        this.state.input.length > 0 ?
        <div className="control">
          {
            this.props.searching ?
              <div className="button is-primary is-loading"></div>
            :
              <div className="button is-primary" onClick={this.clearSearch}>Clear</div>
          }
        </div>
        : null
      }
    </div>
    )
  }
}

const mapStateToProps = state => ({
  search: state.search.search,
  searching: state.search.searching
});

const mapDispatchToProps = {
  searchByName: searchActions.searchBreedsByName,
  clearSearch: searchActions.clearSearch,
  startSearching: searchActions.startSearching
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
