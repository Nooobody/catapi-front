import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.scss';

import BreedList from './components/BreedList';
import SearchWrapper from './components/SearchWrapper';
import Error from './components/Error';

import { actions as appActions } from './redux/components/app';

class App extends Component {

  componentDidMount() {
    this.props.init();
  }

  render() {
    return (
      <div className="App">
        <h1 className="title has-text-centered">Cat Breeds</h1>
        <Error />
        <SearchWrapper></SearchWrapper>
        <BreedList />
      </div>
    );
  }
}

const mapDispatchToProps = {
  init: appActions.init
}

export default connect(null, mapDispatchToProps)(App);
