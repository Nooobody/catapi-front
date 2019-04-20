
import React from 'react';

import SearchBar from './SearchBar';
import OriginFilter from './OriginFilter'
import Filters from './Filters'

export default (props) => (
  <div className="columns is-multiline is-mobile is-centered">
    <div className="column is-4-tablet is-3-desktop is-10-mobile">
      <SearchBar />
    </div>
    <div className="column is-4-tablet is-3-desktop is-10-mobile">
      <OriginFilter />
      <Filters />
    </div>
  </div>
)
