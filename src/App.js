import React, { Component } from 'react';
import './App.scss';

import BreedList from './components/BreedList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BreedList />
      </div>
    );
  }
}

export default App;
