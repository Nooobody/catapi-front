import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import BreedList from './components/BreedList';
import SearchWrapper from './components/SearchWrapper';
import Error from './components/Error';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { actions as appActions } from './redux/components/app';

class App extends Component {

  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div className="App">
        <h1 className="title has-text-centered"><FontAwesomeIcon icon="cat" /> Cat Breeds</h1>
        <Error />
        { this.props.loading ?
            <div className="has-text-centered">
              <FontAwesomeIcon icon="cog" size="4x" spin />
            </div>
          :
            <div>
              <SearchWrapper></SearchWrapper>
              <BreedList />
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.app.loading
});

const mapDispatchToProps = {
  init: appActions.init
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
