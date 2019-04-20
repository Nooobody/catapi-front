import React, { Component } from 'react';
import './App.scss';

import BreedList from './components/BreedList';
import SearchWrapper from './components/SearchWrapper';
import Error from './components/Error';

class App extends Component {
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

export default App;
