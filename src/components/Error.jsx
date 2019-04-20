
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Error extends Component {
  render() {
    if (this.props.error) {
      return (
        <div className="notification is-danger has-text-centered">
          <div className="title is-5">
            {this.props.error}
          </div>
        </div>
      )
    }
    else {
      return null;
    }
  }
}

const mapStateToProps = state => ({
  error: state.breed.error
});

export default connect(mapStateToProps)(Error);
